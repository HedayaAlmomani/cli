// const fs = require("fs").promises;
// const path = require("path");
// const process = require("process");
// const { copyTemplateFolder, createFormStructures } = require("./helper");
// const { formTemplate } = require("./constant");

// const parentFolder = path.dirname(__dirname);
// const templateFolder = path.join(parentFolder, "template");
// const targetFolder = path.join(process.cwd(), "MyProject");
// const formsFolder = path.join(targetFolder, "Forms");

// const configs = []
// async function main() {
//   try {
//     await copyTemplateFolder(templateFolder, targetFolder);
//     await createFormStructures(configs, formsFolder);
//   } catch (error) {
//     console.error("Error processing template:", error);
//   }
// }

// main();

const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { copyTemplateFolder, createFormStructures } = require("./helper");
const { formTemplate } = require("./constant");

const parentFolder = path.dirname(__dirname);
const templateFolder = path.join(parentFolder, "template");
const targetFolder = path.join(process.cwd(), "MyProject");
const formsFolder = path.join(targetFolder, "Forms");

const stepperPageFilePath = path.join(targetFolder, "stepperPage", "index.tsx");

const configs = [
  {
    folderName: "FirstForm",
    content: formTemplate,
    formConfig: [
      {
        name: "firstName",
        field: "input",
        type: "string",
      },
      {
        name: "number",
        field: "input",
        type: "number",
      },
      {
        name: "account",
        field: "select",
        type: "string",
      },
      {
        name: "mobileNumber",
        field: "phone",
        type: "string",
      },
      {
        name: "document",
        field: "upload",
        type: "file",
      },
    ],
  },
  {
    folderName: "SecondForm",
    content: formTemplate,
    formConfig: [
      {
        name: "firstName",
        field: "input",
        type: "string",
      },
      {
        name: "number",
        field: "input",
        type: "number",
      },
      {
        name: "account",
        field: "select",
        type: "string",
      },
      {
        name: "mobileNumber",
        field: "phone",
        type: "string",
      },
      {
        name: "document",
        field: "upload",
        type: "file",
      },
    ],
  },
];

async function replaceFormsImports() {
  try {
    let content = await fs.readFile(stepperPageFilePath, "utf8");

    // Generate import statements
    const importsStatements = configs.map((item) => {
      return `import ${item?.folderName} from "../Forms/${item?.folderName}";`;
    });

    // Generate component usage
    const StepsComponents = configs.map((item) => {
      return `  <${item?.folderName} />,`;
    });

    // Join import statements and components with newlines
    const importsResult = importsStatements.join("\n");
    const componentsResult = StepsComponents.join("\n");

    // Replace placeholders in content
    let modifiedContent = content
      .replace(/FormsImports/g, importsResult)
      .replace(/StepsComponentData/g, componentsResult);

    // Write the modified content back to the file
    await fs.writeFile(stepperPageFilePath, modifiedContent, "utf8");

    console.log(
      "Replacement successful: 'FormsImports' has been replaced with 'import' and 'StepsComponentData' has been replaced."
    );
  } catch (error) {
    console.error("Error replacing FormsImports:", error);
  }
}

async function main() {
  try {
    await copyTemplateFolder(templateFolder, targetFolder);
    await createFormStructures(configs, formsFolder);

    await replaceFormsImports();
  } catch (error) {
    console.error("Error processing template:", error);
  }
}

main();
