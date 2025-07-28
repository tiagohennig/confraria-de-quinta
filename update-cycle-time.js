const { graphql } = require("@octokit/graphql");
const token = process.env.GITHUB_TOKEN;

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${token}`,
  },
});

const PROJECT_NAME = "confraria de quinta"; // Replace with your project name
const REPO_OWNER = "tiagohennig"; // UPDATE THIS with your GitHub username
const REPO_NAME = "confraria-de-quinta"; // UPDATE THIS with your repository name

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
  
  console.log(`Looking for repository projects in: ${REPO_OWNER}/${REPO_NAME}`);
  
  try {
    const result = await graphqlWithAuth(query, { 
      owner: REPO_OWNER, 
      repo: REPO_NAME 
    });
    
    console.log("Available repository projects:");
    console.log(`Total projects found: ${result.repository.projectsV2.nodes.length}`);
    
    if (result.repository.projectsV2.nodes.length === 0) {
      console.log("❌ No repository projects found!");
      console.log("This means your project is NOT linked to this repository.");
      console.log(`Check: https://github.com/${REPO_OWNER}/${REPO_NAME}/projects`);
      return null;
    }
    
    result.repository.projectsV2.nodes.forEach((p, index) => {
      console.log(`${index + 1}. "${p.title}" (ID: ${p.id})`);
    });
    
    console.log(`\nLooking for project with name: "${PROJECT_NAME}"`);
    
    const project = result.repository.projectsV2.nodes.find(
      (p) => p.title.toLowerCase() === PROJECT_NAME.toLowerCase()
    );
    
    if (project) {
      console.log(`✅ Found project: "${project.title}"`);
      return project.id;
    } else {
      console.log(`❌ Project "${PROJECT_NAME}" not found in repository projects.`);
      console.log("Available project names (case-insensitive search):");
      result.repository.projectsV2.nodes.forEach(p => {
        console.log(`- "${p.title}" (lowercase: "${p.title.toLowerCase()}")`);
      });
      return null;
    }
  } catch (error) {
    console.error("Error querying repository projects:", error);
    return null;
  }
}

async function getUserProjectId() {
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
  
  try {
    console.log("Checking user/personal projects...");
    const result = await graphqlWithAuth(query);
    console.log("User/Personal projects:");
    console.log(`Total user projects found: ${result.viewer.projectsV2.nodes.length}`);
    
    if (result.viewer.projectsV2.nodes.length === 0) {
      console.log("❌ No user projects found!");
      return null;
    }
    
    result.viewer.projectsV2.nodes.forEach((p, index) => {
      console.log(`${index + 1}. "${p.title}" (ID: ${p.id})`);
    });
    
    const project = result.viewer.projectsV2.nodes.find(
      (p) => p.title.toLowerCase() === PROJECT_NAME.toLowerCase()
    );
    
    if (project) {
      console.log(`✅ Found user project: "${project.title}"`);
      return project.id;
    } else {
      console.log(`❌ Project "${PROJECT_NAME}" not found in user projects.`);
      return null;
    }
  } catch (error) {
    console.error("Error querying user projects:", error);
    return null;
  }
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
    console.log("🚀 Starting project cycle tracker...");
    console.log("=".repeat(50));
    
    console.log("\n=== Checking Repository Projects ===");
    let projectId = await getProjectId();
    
    if (!projectId) {
      console.log("\n=== Checking User/Personal Projects ===");
      projectId = await getUserProjectId();
    }
    
    if (!projectId) {
      console.error("\n❌ Project not found in either repository or user projects");
      console.log("\n💡 Possible solutions:");
      console.log("1. Make sure your project name exactly matches");
      console.log("2. Link your project to the repository");
      console.log("3. Check if you have the right permissions");
      console.log("4. Create a new project if needed");
      return;
    }

    console.log(`\n✅ Using project ID: ${projectId}`);
    console.log("\n=== Getting Project Items ===");
    
    const items = await getProjectItems(projectId);
    console.log(`Found ${items.length} items in the project.`);

    if (items.length === 0) {
      console.log("⚠️ No items found in the project. Add some issues to test the functionality.");
      return;
    }

    console.log("\n=== Processing Items ===");
    let updatedItems = 0;

    for (const item of items) {
      const fields = item.fieldValues.nodes;
      const status = getFieldValue(fields, "Status")?.toLowerCase();
      const startDate = getFieldValue(fields, "Start Date");
      const endDate = getFieldValue(fields, "End Date");

      console.log(`\nProcessing item: ${item.content?.title || 'Untitled'} (${item.content?.number || 'No number'})`);
      console.log(`Current status: ${status || 'No status'}`);
      console.log(`Start date: ${startDate || 'Not set'}`);
      console.log(`End date: ${endDate || 'Not set'}`);

      const startDateFieldId = getFieldId(fields, "Start Date");
      const endDateFieldId = getFieldId(fields, "End Date");
      const cycleTimeFieldId = getFieldId(fields, "Cycle Time");

      const today = new Date().toISOString().split("T")[0];

      // Set start date when item moves to "in progress"
      if (status === "in progress" && !startDate && startDateFieldId) {
        try {
          await updateField(projectId, item.id, startDateFieldId, today);
          console.log(`✅ Set Start Date to ${today} for issue ${item.content?.number}`);
          updatedItems++;
        } catch (error) {
          console.error(`❌ Failed to set Start Date for issue ${item.content?.number}:`, error.message);
        }
      }

      // Set end date and calculate cycle time when item moves to "done"
      if (status === "done" && startDate && !endDate && endDateFieldId && cycleTimeFieldId) {
        try {
          await updateField(projectId, item.id, endDateFieldId, today);
          const start = new Date(startDate);
          const end = new Date(today);
          const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
          await updateField(projectId, item.id, cycleTimeFieldId, diffDays);
          console.log(`✅ Set End Date to ${today} and Cycle Time to ${diffDays} days for issue ${item.content?.number}`);
          updatedItems++;
        } catch (error) {
          console.error(`❌ Failed to set End Date/Cycle Time for issue ${item.content?.number}:`, error.message);
        }
      }
    }
    
    console.log("\n=== Summary ===");
    console.log(`Total items processed: ${items.length}`);
    console.log(`Items updated: ${updatedItems}`);
    console.log("✅ Project cycle tracker completed successfully.");
    
  } catch (error) {
    console.error("❌ Error in main function:", error);
  }
}

main().catch((err) => console.error("❌ Unhandled error:", err));
