const fs = require("fs");
const filterParameters = require("../../configs/filterParameter.json");

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
    "import { lCStatusOptions, Parameter, emptyParameters } from '../../constant'",
    "import './style.scss'",
  ];

  const formFields = filterParameters
    .map((param) => {
      switch (param.inputComponent) {
        case "input":
          return `
    <ArenaInput
      onChange={(value: string | number | null) =>
        handleChange(value as string, '${param.parameterName}')
      }
      size="large"
      placeholder="${param.placeholder}"
      label="${param.label}"
      value={parameterFilter?.${param.parameterName}}
      restrictedCharactersRegex={/[^0-9]/}
    />
  `;

        case "select":
          return `
    <SelectGroup
      placeholder="${param.placeholder}"
      required={true}
      options={[{ groupName: '', list: lCStatusOptions }]}
      onChange={(selectedOption: any) => handleSelectChange(selectedOption, "${param.parameterName}")}
      value={lCStatusOptions.find((option) => option.value === parameterFilter?.${param.parameterName}) || null}
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
      selectedOption: { value: string; label: string } | null,
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
  `;

  const fileContent = `
  ${staticImports.join("\n")}
  
  const FilterSection = ({
    parameter,
    setParameter,
    setPageNumber,
    setSort,
    setCurrentHeadCell,
    disabled,
  }: any) => {
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
