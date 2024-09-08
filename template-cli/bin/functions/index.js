const fs = require("fs");
const filterParameters = require("../../configs/filterParameter.json");
function generateCustomObjectString(paramsArray) {
  // Define the keys and the order you want in the final object
  const desiredKeys = {
    lcFinancingRequestId: "",
    lcRequestNumber: "",
    applicantName: "",
    requestDate: "",
    lcStatus: "",
  };

  // Construct the string based on the desiredKeys
  let objectString = "{\n";
  Object.keys(desiredKeys).forEach((key) => {
    objectString += `  ${key}: "",\n`;
  });
  objectString += "}";

  return objectString;
}
const createFilterSectionFile = () => {
  const staticImports = [
    `import React, { useState, useEffect } from 'react'`,
    "//@ts-ignore",
    `import {
    SectionHead,
    InfoCircle,
    FilterIcon,
    ArenaInput,
    //@ts-ignore
  } from "@arena/components";`,
    `//@ts-ignore
      import { Button, SideDrawer, Date, SelectGroup } from 'digitinary-ui'`,
    `//@ts-ignore
      import { Utils } from '@arena/common-web'`,
    "import './style.scss'",
    " type Parameter = Record<string, string | null>;",
    `const emptyParameters = ${generateCustomObjectString(filterParameters)}`,
  ];

  const formFields = filterParameters
    .map((param) => {
      switch (param?.inputComponent) {
        case "input":
          return `
    <ArenaInput
      onChange={(value: string | number | null) =>
        handleChange(value as string, '${param?.parameterName}')
      }
      size="large"
      placeholder="${param?.placeholder}"
      label="${param?.label}"
      value={parameterFilter?.${param?.parameterName}}
      restrictedCharactersRegex={${param.isNumber ? "/[^0-9]/" : "null"}}
    />
  `;

        case "select":
          return `
    <SelectGroup
      placeholder="${param.placeholder}"
      required={true}
      options={[{ groupName: '', list: [{label:"" , value:""}] }]}
      onChange={(selectedOption: Option) => handleSelectChange(selectedOption, "${param.parameterName}")}
      //put the Options instead of the empty array
      value={[{label:"" , value:""}].find((option) => option.value === parameterFilter?.${param.parameterName}) || null}
      isMultiple={false}
      label="${param.label}"
      withSearch={false}
      errorMsg={''}
      size="large"
    />
  `;

        case "Date":
          return `<Date
                value={parameterFilter?.${param.parameterName}}
                onChange={(value: string | number | null) =>
                  handleChange(value as string, '${param.parameterName}')
                }
                label="${param.label}"
                placeholder="${param.placeholder}"
                disabled={false}
                size="large"
                clearable={true}
                fullWidth={false}
                required={true}
                errorMsg={''}
              />`;

        default:
          return "";
      }
    })
    .join("\n");

  const myStates = `
    const [openFilterDrawer, setOpenFilterDrawer] = useState<boolean>(false);
    const [saveIsDisabled, setSaveIsDisabled] = useState<boolean>(false);
    const [parameterFilter, setParameterFilter] = useState<Parameter>(emptyParameters);
  `;

  const myFunctions = `
    const handleChange = (newValue: string | null, key: keyof Parameter) => {
        //@ts-ignore
      setParameterFilter((prev) => ({ ...prev, [key]: newValue }));
    };
  
    const handleReset = () => {
      setParameter(emptyParameters);
      setParameterFilter(emptyParameters);
    };
  
    const handleCancel = () => {
      setParameterFilter(emptyParameters);
      setOpenFilterDrawer(false);
    };
  
    const handleSelectChange = (
      selectedOption: Option | null,
      parameterName: string
    ) => {
      handleChange(selectedOption ? selectedOption.value : '', parameterName);
    };
  
    const handleFiltersSearch = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      event.stopPropagation();
      setParameter({ ...parameterFilter });
      setPageNumber(0);
      handleCancel();
      setSort('');
      setCurrentHeadCell('');
    };
  
    const handleSaveActiveState = () => {
      setSaveIsDisabled(
        !Object?.values(parameterFilter)?.some(Boolean) ||
        Object?.entries(parameterFilter)?.every(([key, value]) => parameter[key] === value)
      );
    };
  
    const isFilterApplied =
      Object.values(parameterFilter)?.some(Boolean) ||
      Object.values(parameter)?.some(Boolean);

           useEffect(() => {
        handleSaveActiveState()
      }, [parameter, parameterFilter])
    
      useEffect(() => {
        setParameterFilter({ ...parameter })
      }, [openFilterDrawer])
  `;

  const fileContent = `
  ${staticImports.join("\n")}
 interface FilterSectionProps {
  parameter: Parameter;
  setParameter: React.Dispatch<React.SetStateAction<Parameter>>;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  setCurrentHeadCell: React.Dispatch<React.SetStateAction<string>>;
  disabled?: boolean;
}
 
 interface Option {
  value: string
  label: string | JSX.Element
}
  const FilterSection = ({
    parameter,
    setParameter,
    setPageNumber,
    setSort,
    setCurrentHeadCell,
    disabled,
  }: FilterSectionProps) => {
  ${myStates}
  ${myFunctions}
    return (
      <div className="filter-form-container">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setOpenFilterDrawer(true)}
          disabled={disabled}
          startIcon={<FilterIcon width={20} height={20} />}
        >
          Filter
        </Button>
  
        <SideDrawer
          open={openFilterDrawer}
          setOpen={setOpenFilterDrawer}
          width="620px"
          children={
            <div className="filter-form">
              <SectionHead
                text="Advance Filtration"
                withClose={true}
                closeFunction={() => setOpenFilterDrawer(!openFilterDrawer)}
              />
  
              <div className="filter-section-container">
                ${formFields}
              </div>
  
              <div className="container-filters-actions">
                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  onClick={isFilterApplied ? handleReset : handleCancel}
                  fullWidth={true}
                >
                  {isFilterApplied ? 'Reset' : 'Cancel'}
                </Button>
  
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleFiltersSearch}
                  fullWidth={true}
                  disabled={saveIsDisabled}
                >
                  Search
                </Button>
              </div>
            </div>
          }
        />
      </div>
    );
  };
  
  export default FilterSection;
  `;

  fs.writeFileSync(
    "./template/components/FilterSection/index.tsx",
    fileContent
  );
};

const replaceTextInFile = (filePath, searchValue, replaceValue) => {
  try {
    let fileContent = fs.readFileSync(filePath, "utf8");
    fileContent = fileContent.replace(
      new RegExp(searchValue, "g"),
      replaceValue
    );
    fs.writeFileSync(filePath, fileContent, "utf8");
    console.log("hedaya");

    console.log(
      `Replaced "${searchValue}" with "${replaceValue}" in ${filePath}`
    );
  } catch (error) {
    console.error(`Error replacing text in file ${filePath}:`, error);
  }
};

module.exports = { createFilterSectionFile, replaceTextInFile };
