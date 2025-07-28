const { graphql } = require("@octokit/graphql");
const token = process.env.GITHUB_TOKEN;

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${token}`,
  },
});

const PROJECT_NAME = "confraria de quinta"; // Replace with your project name
const REPO_OWNER = "tiagohennig"; // Replace with your GitHub username
const REPO_NAME = "confraria-de-quinta"; // Replace with your repository name

async function getProjectId() {
  const query = `
    query($owner: String!, $repo: String!) {
      repository(owner: $owner, name: $repo) {
        projectsV2(first: 100) {
          nodes {
            id
            title
          }
        }
      }
    }
  `;
  const result = await graphqlWithAuth(query, { 
    owner: REPO_OWNER, 
    repo: REPO_NAME 
  });
  
  // Add debugging to see available projects
  console.log("Available repository projects:");
  console.log(`Total projects found: ${result.repository.projectsV2.nodes.length}`);
  
  if (result.repository.projectsV2.nodes.length === 0) {
    console.log("No repository projects found. You need to create a GitHub Project linked to this repository.");
    console.log(`Go to https://github.com/${REPO_OWNER}/${REPO_NAME}/projects and create a new project.`);
    return null;
  }
  
  result.repository.projectsV2.nodes.forEach((p, index) => {
    console.log(`${index + 1}. "${p.title}" (ID: ${p.id})`);
  });
  
  console.log(`\nLooking for project named: "${PROJECT_NAME}"`);
  
  const project = result.repository.projectsV2.nodes.find(
    (p) => p.title.toLowerCase() === PROJECT_NAME.toLowerCase()
  );
  
  if (project) {
    console.log(`Found project: "${project.title}" with ID: ${project.id}`);
  } else {
    console.log(`Project "${PROJECT_NAME}" not found.`);
    console.log("Available project names:");
    result.repository.projectsV2.nodes.forEach(p => {
      console.log(`- "${p.title}"`);
    });
  }
  
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
  try {
    console.log("Starting repository project cycle tracker...");
    console.log(`Repository: ${REPO_OWNER}/${REPO_NAME}`);
    
    const projectId = await getProjectId();
    if (!projectId) {
      console.error("Repository project not found. Please create a GitHub Project linked to this repository.");
      return;
    }

    console.log("Getting project items...");
    const items = await getProjectItems(projectId);
    console.log(`Found ${items.length} items in the project.`);

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
    
    console.log("Repository project cycle tracker completed successfully.");
  } catch (error) {
    console.error("Error in main function:", error);
  }
}

main().catch((err) => console.error("Unhandled error:", err));
