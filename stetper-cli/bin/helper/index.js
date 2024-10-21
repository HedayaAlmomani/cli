const fs = require("fs").promises;
const path = require("path");
const { formTemplate, defaultStyle } = require("../constant");

async function copyTemplateFolder(templateDir, targetDir) {
  try {
    await fs.mkdir(targetDir, { recursive: true });
    const items = await fs.readdir(templateDir);

    await Promise.all(
      items.map(async (item) => {
        const itemPath = path.join(templateDir, item);
        const targetPath = path.join(targetDir, item);
        const stats = await fs.stat(itemPath);

        if (stats.isDirectory()) {
          await copyTemplateFolder(itemPath, targetPath);
        } else {
          await fs.copyFile(itemPath, targetPath);
        }
      })
    );
  } catch (error) {
    console.error(`Error copying template folder: ${error.message}`);
    throw error;
  }
}

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

function handleInputField(name, type) {
  const stateType = type === "number" ? "number" : "string";
  const stateStr = `const [${name}, set${capitalize(
    name
  )}] = useState<${stateType}>(${type === "number" ? 0 : '""'});`;

  const elementStr = `
    <ArenaInput
      onChange={(value: ${stateType}) => set${capitalize(name)}(value)}
      size="medium"
      placeholder="e.g. ${capitalize(name)}"
      label="${capitalize(name)}"
      value={${name}}
      showClearIcon={!!${name}}
      required={true}
    />`;

  return { stateStr, elementStr };
}

function handleSelectField(name) {
  const stateStr1 = `const [${name}, set${capitalize(
    name
  )}] = useState<string>("");`;
  const stateStr2 = `const [${name}Options, set${capitalize(
    name
  )}Options] = useState<any>([]);`;

  const handlerStr = `
    const handle${capitalize(
      name
    )}Change = (selectedOption: { value: string; label: JSX.Element | string } | null) => {
      set${capitalize(name)}(selectedOption ? selectedOption.value : '');
    };`;

  const elementStr = `
    <SelectGroup
      placeholder="Select"
      required={true}
      options={[{ groupName: '', list: ${name}Options }]}
      onChange={handle${capitalize(name)}Change}
      value={${name}Options.find(option => option.value === ${name}) || null}
      isMultiple={false}
      label="${capitalize(name)}"
      withSearch={false}
      errorMsg={''}
      size="large"
    />`;

  return { stateStr1, stateStr2, handlerStr, elementStr };
}

function handlePhoneField(name) {
  const stateStr = `const [${name}, set${capitalize(
    name
  )}] = useState<Record<string, string>>({
    phoneNumberValue: '',
    countryCodeValue: ''
  });`;

  const handlerStr = `
    const handleChange${capitalize(name)} = (value: string, key: string) => {
      set${capitalize(name)}(prev => ({
        ...prev,
        [key]: value
      }));
    };`;

  const elementStr = `
    <PhoneNumber
      phoneNumPlaceholder="79 000 0000"
      label="${capitalize(name)}"
      size="large"
      required={true}
      countryCodeValue={${name}.countryCodeValue}
      phoneNumberValue={${name}.phoneNumberValue}
      onCountryCodeChange={(value: string) => handleChange${capitalize(
        name
      )}(value, 'countryCodeValue')}
      onPhoneNumberChange={(value: string) => handleChange${capitalize(
        name
      )}(value, 'phoneNumberValue')}
      errorMessage=""
    />`;

  return { stateStr, handlerStr, elementStr };
}
function handleUploadField(name) {
  const state = `
  const [${name}, set${capitalize(name)}] = useState<File[] | string[]>([]);
  `;

  const handleFunction = `
  const handle${capitalize(name)}Change = (files: File[]) => set${capitalize(
    name
  )}(files);
  `;

  const element = `
  <FileUploader
    multiple
    withPreview
    withFileName
    fileName="${name}"
    onChange={handle${capitalize(name)}Change}
    acceptedFileExtensions="image/jpg, image/png, image/jpeg"
    size="medium"
    label={
      <CustomLabel
        label="${capitalize(name)}"
        note="(You can upload multiple files in the formats PDF, PNG, and JPG)"
        required
      />
    }
    placeholder="e.g ${capitalize(name)}"
    value={${name}}
    required={false}
  />
  `;

  return { state, handleFunction, element };
}

function buildForm(config) {
  const states = [];
  const handlers = [];
  const elements = [];

  config.forEach(({ name, field, type }) => {
    if (field === "input") {
      const { stateStr, elementStr } = handleInputField(name, type);
      states.push(stateStr);
      elements.push(elementStr);
    } else if (field === "select") {
      const { stateStr1, stateStr2, handlerStr, elementStr } =
        handleSelectField(name);
      states.push(stateStr1, stateStr2);
      handlers.push(handlerStr);
      elements.push(elementStr);
    } else if (field === "phone") {
      const { stateStr, handlerStr, elementStr } = handlePhoneField(name);
      states.push(stateStr);
      handlers.push(handlerStr);
      elements.push(elementStr);
    } else if (field === "upload") {
      const { state, handleFunction, element } = handleUploadField(name);
      states.push(state);
      handlers.push(handleFunction);
      elements.push(element);
    }
  });

  return {
    states: states.join("\n"),
    handlers: handlers.join("\n"),
    elements: elements.join("\n"),
  };
}

// this function will create forms folder and create the folders files from config array

async function createFormStructures(configs, formsFolder) {
  try {
    // Create the Forms folder
    await fs.mkdir(formsFolder, { recursive: true });

    // Iterate through the configurations
    for (const { folderName, content, formConfig } of configs) {
      const { states, handlers, elements } = buildForm(formConfig);

      const formFolder = path.join(formsFolder, folderName);
      // Create the folder for each form
      await fs.mkdir(formFolder, { recursive: true });

      // Replace MyStates, MyFunctions, and MyElements with the desired statements
      let modifiedContent = content
        .replace(/MyStates/g, states)
        .replace(/MyFunctions/g, handlers)
        .replace(/MyElements/g, elements)
        .replace(/MySimpleForm/g, folderName);

      // Create index.tsx file with the modified content
      await fs.writeFile(
        path.join(formFolder, "index.tsx"),
        modifiedContent,
        "utf8"
      );

      // Create an empty style.scss file
      await fs.writeFile(path.join(formFolder, "style.scss"), defaultStyle, "utf8");
    }

    console.log("Form structures created successfully.");
  } catch (error) {
    console.error("Error creating form structures:", error);
  }
}
async function replaceFormsImports(stepperPageFilePath, configs) {
  try {
    let content = await fs.readFile(stepperPageFilePath, "utf8");
    // Generate import statements
    const importsStatements = configs.map((item) => {
      return `import ${item?.folderName} from "../Forms/${item?.folderName}";`;
    });
    const StepsComponents = configs.map((item) => {
      return `  <${item?.folderName} />,`;
    });
    const importsResult = importsStatements.join("\n");
    const componentsResult = StepsComponents.join("\n");

    // Replace placeholders in content
    let modifiedContent = content
      .replace(/FormsImports/g, importsResult)
      .replace(/StepsComponentData/g, componentsResult);

    // Write the modified content back to the file
    await fs.writeFile(stepperPageFilePath, modifiedContent, "utf8");
  } catch (error) {
    console.error("Error replacing FormsImports:", error);
  }
}
module.exports = {
  copyTemplateFolder,
  buildForm,
  createFormStructures,
  replaceFormsImports,
};
