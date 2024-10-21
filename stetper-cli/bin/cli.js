const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const {
  copyTemplateFolder,
  createFormStructures,
  replaceFormsImports,
} = require("./helper");
const { formTemplate } = require("./constant");

const parentFolder = path.dirname(__dirname);
const templateFolder = path.join(parentFolder, "template");
const targetFolder = path.join(process.cwd(), "MyProject");
const formsFolder = path.join(targetFolder, "Forms");

const stepperPageFilePath = path.join(targetFolder, "stepperPage", "index.tsx");

const configs = [
  {
    folderName: "RegistrationForm",
    content: formTemplate,
    formConfig: [
      {
        name: "fullName",
        field: "input",
        type: "string",
      },
      {
        name: "age",
        field: "input",
        type: "number",
      },
      {
        name: "userType",
        field: "select",
        type: "string",
      },
      {
        name: "contactNumber",
        field: "phone",
        type: "string",
      },
      {
        name: "profilePicture",
        field: "upload",
        type: "file",
      },
    ],
  },
  {
    folderName: "FeedbackForm",
    content: formTemplate,
    formConfig: [
      {
        name: "customerName",
        field: "input",
        type: "string",
      },
      {
        name: "rating",
        field: "input",
        type: "number",
      },
      {
        name: "serviceUsed",
        field: "select",
        type: "string",
      },
      {
        name: "emailAddress",
        field: "input",
        type: "string",
      },
      {
        name: "additionalComments",
        field: "upload",
        type: "file",
      },
    ],
  },
  {
    folderName: "OrderForm",
    content: formTemplate,
    formConfig: [
      {
        name: "customerName",
        field: "input",
        type: "string",
      },
      {
        name: "quantity",
        field: "input",
        type: "number",
      },
      {
        name: "productSelection",
        field: "select",
        type: "string",
      },
      {
        name: "contactNumber",
        field: "phone",
        type: "string",
      },
      {
        name: "orderDocument",
        field: "upload",
        type: "file",
      },
    ],
  },
  {
    folderName: "SupportTicketForm",
    content: formTemplate,
    formConfig: [
      {
        name: "issueTitle",
        field: "input",
        type: "string",
      },
      {
        name: "severityLevel",
        field: "input",
        type: "number",
      },
      {
        name: "ticketCategory",
        field: "select",
        type: "string",
      },
      {
        name: "customerPhone",
        field: "phone",
        type: "string",
      },
      {
        name: "supportDocument",
        field: "upload",
        type: "file",
      },
    ],
  },
  {
    folderName: "AppointmentForm",
    content: formTemplate,
    formConfig: [
      {
        name: "patientName",
        field: "input",
        type: "string",
      },
      {
        name: "age",
        field: "input",
        type: "number",
      },
      {
        name: "appointmentType",
        field: "select",
        type: "string",
      },
      {
        name: "patientContact",
        field: "phone",
        type: "string",
      },
      {
        name: "medicalRecords",
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

    await replaceFormsImports(stepperPageFilePath, configs);
  } catch (error) {
    console.error("Error processing template:", error);
  }
}

main();
