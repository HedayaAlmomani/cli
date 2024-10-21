const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { copyTemplateFolder, buildForm } = require("./helper");

const parentFolder = path.dirname(__dirname);
const templateFolder = path.join(parentFolder, "template");
const targetFolder = path.join(process.cwd(), "MyProject");
const formConfig = [
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
];

async function main() {
  try {
    const { states, handlers, elements } = buildForm(formConfig);
    console.log("Generated Form States:\n", states);
    console.log("\nGenerated Form Handlers:\n", handlers);
    console.log("\nGenerated Form Elements:\n", elements);
    await copyTemplateFolder(templateFolder, targetFolder);

    
  } catch (error) {
    console.error("Error processing template:", error);
  }
}

main();
