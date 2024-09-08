
  import React, { useState, useEffect } from 'react'
//@ts-ignore
import {
    SectionHead,
    InfoCircle,
    FilterIcon,
    ArenaInput,
    //@ts-ignore
  } from "@arena/components";
//@ts-ignore
      import { Button, SideDrawer, Date, SelectGroup } from 'digitinary-ui'
//@ts-ignore
      import { Utils } from '@arena/common-web'
import { Parameter, emptyParameters } from '../../constant'
import './style.scss'
  
  const FilterSection = ({
    parameter,
    setParameter,
    setPageNumber,
    setSort,
    setCurrentHeadCell,
    disabled,
  }: any) => {
  
    const [openFilterDrawer, setOpenFilterDrawer] = useState<boolean>(false);
    const [saveIsDisabled, setSaveIsDisabled] = useState<boolean>(false);
    const [parameterFilter, setParameterFilter] = useState<Parameter>(emptyParameters);
  
  
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

           useEffect(() => {
        handleSaveActiveState()
      }, [parameter, parameterFilter])
    
      useEffect(() => {
        setParameterFilter({ ...parameter })
      }, [openFilterDrawer])
  
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
                
    <ArenaInput
      onChange={(value: string | number | null) =>
        handleChange(value as string, 'financingRequestNumber')
      }
      size="large"
      placeholder="e.g. 642684383"
      label="Request Number"
      value={parameterFilter?.financingRequestNumber}
      restrictedCharactersRegex={null}
    />
  

    <ArenaInput
      onChange={(value: string | number | null) =>
        handleChange(value as string, 'lcRequestNumber')
      }
      size="large"
      placeholder="e.g. 642684383"
      label="LC Request Number"
      value={parameterFilter?.lcRequestNumber}
      restrictedCharactersRegex={null}
    />
  

    <ArenaInput
      onChange={(value: string | number | null) =>
        handleChange(value as string, 'applicantName')
      }
      size="large"
      placeholder="e.g. Hedaya Osama"
      label="Applicant Name"
      value={parameterFilter?.applicantName}
      restrictedCharactersRegex={null}
    />
  

    <SelectGroup
      placeholder="Select"
      required={true}
      options={[{ groupName: '', list: [{label:"" , value:""}] }]}
      onChange={(selectedOption: any) => handleSelectChange(selectedOption, "lcStatus")}
      //put the Options instead of the empty array
      value={[{label:"" , value:""}].find((option) => option.value === parameterFilter?.lcStatus) || null}
      isMultiple={false}
      label="LC Status"
      withSearch={false}
      errorMsg={''}
      size="large"
    />
  
<Date
                value={parameterFilter?.requestDate}
                onChange={(value: string | number | null) =>
                  handleChange(value as string, 'requestDate')
                }
                label="hiii"
                placeholder="hi"
                disabled={false}
                size="large"
                clearable={true}
                fullWidth={false}
                required={true}
                errorMsg={''}
              />
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
  