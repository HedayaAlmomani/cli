const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { copyTemplateFolder, createFormStructures } = require("./helper");
const { formTemplate } = require("./constant");

const parentFolder = path.dirname(__dirname);
const templateFolder = path.join(parentFolder, "template");
const targetFolder = path.join(process.cwd(), "MyProject");
const formsFolder = path.join(targetFolder, "Forms");

const configs = [
  {
    folderName: "form1",
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
    folderName: "form2",
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

async function main() {
  try {
    await copyTemplateFolder(templateFolder, targetFolder);
    await createFormStructures(configs, formsFolder);
  } catch (error) {
    console.error("Error processing template:", error);
  }
}

main();
