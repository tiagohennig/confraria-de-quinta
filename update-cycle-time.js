const { graphql } = require("@octokit/graphql");
const token = process.env.GITHUB_TOKEN;

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${token}`,
  },
});

const PROJECT_NAME = "confraria de quinta"; // Replace with your project name

async function getProjectId() {
  const query = `
    query {
      viewer {
        projectsV2(first: 100) {
          nodes {
            id
            title
          }
        }
      }
    }
  `;
  const result = await graphqlWithAuth(query);
  const project = result.viewer.projectsV2.nodes.find(
    (p) => p.title.toLowerCase() === PROJECT_NAME.toLowerCase()
  );
  return project?.id;
}

async function getProjectItems(projectId) {
  const query = `
    query($projectId: ID!) {
      node(id: $projectId) {
        ... on ProjectV2 {
          items(first: 100) {
            nodes {
              id
              fieldValues(first: 20) {
                nodes {
                  value
                  projectField {
                    name
                    dataType
                    id
                  }
                }
              }
              content {
                ... on Issue {
                  id
                  title
                  number
                }
              }
            }
          }
        }
      }
    }
  `;
  const result = await graphqlWithAuth(query, { projectId });
  return result.node.items.nodes;
}

function getFieldId(fields, fieldName) {
  const field = fields.find(
    (f) => f.projectField?.name?.toLowerCase() === fieldName.toLowerCase()
  );
  return field?.projectField?.id;
}

function getFieldValue(fields, fieldName) {
  const field = fields.find(
    (f) => f.projectField?.name?.toLowerCase() === fieldName.toLowerCase()
  );
  return field?.value;
}

async function updateField(projectId, itemId, fieldId, value) {
  const mutation = `
    mutation($input: UpdateProjectV2ItemFieldValueInput!) {
      updateProjectV2ItemFieldValue(input: $input) {
        projectV2Item {
          id
        }
      }
    }
  `;
  await graphqlWithAuth(mutation, {
    input: {
      projectId,
      itemId,
      fieldId,
      value: { text: value.toString() },
    },
  });
}

async function main() {
  const projectId = await getProjectId();
  if (!projectId) {
    console.error("Project not found");
    return;
  }

  const items = await getProjectItems(projectId);

  for (const item of items) {
    const fields = item.fieldValues.nodes;
    const status = getFieldValue(fields, "Status")?.toLowerCase();
    const startDate = getFieldValue(fields, "Start Date");
    const endDate = getFieldValue(fields, "End Date");

    const startDateFieldId = getFieldId(fields, "Start Date");
    const endDateFieldId = getFieldId(fields, "End Date");
    const cycleTimeFieldId = getFieldId(fields, "Cycle Time");

    const today = new Date().toISOString().split("T")[0];

    if (status === "in progress" && !startDate && startDateFieldId) {
      await updateField(projectId, item.id, startDateFieldId, today);
      console.log(`Set Start Date for issue ${item.content?.number}`);
    }

    if (status === "done" && startDate && !endDate && endDateFieldId && cycleTimeFieldId) {
      await updateField(projectId, item.id, endDateFieldId, today);
      const start = new Date(startDate);
      const end = new Date(today);
      const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      await updateField(projectId, item.id, cycleTimeFieldId, diffDays);
      console.log(`Set End Date and Cycle Time for issue ${item.content?.number}`);
    }
  }
}

main().catch((err) => console.error(err));
