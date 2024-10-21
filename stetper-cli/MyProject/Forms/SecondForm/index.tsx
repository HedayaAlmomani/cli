
import React from 'react'
import { useState, useContext, useRef, useEffect } from 'react'
//@ts-ignore
import { Utils, currenciesIcons, scrollTop } from '@arena/common-web'
//@ts-ignore
import { ArenaInput, SearchIcon, PhoneNumber,FileUploader } from '@arena/components'
import AlertComponent from '../AlertComponent'
//@ts-ignore
import { Button ,SelectGroup } from 'digitinary-ui'
//@ts-ignore
import { useNavigate } from 'react-router-dom'
//@ts-ignore
import { ContextData } from '../../types'
//@ts-ignore
import CustomLabel from '../../components/CustomLabel'
//@ts-ignore
import './style.scss'
import { StepperContext } from '../../stepperPage'

const FirstForm = () => {
  const { handleCompleteStep, setCurrentStep, data, setRecordId, completedSteps } =
    useContext<ContextData>(StepperContext)
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)
  //@ts-ignore
  let id: string | null = params.get('id')
  const [firstName, setFirstName] = useState<string>("");
const [number, setNumber] = useState<number>(0);
const [account, setAccount] = useState<string>("");
const [accountOptions, setAccountOptions] = useState<any>([]);
const [mobileNumber, setMobileNumber] = useState<Record<string, string>>({
    phoneNumberValue: '',
    countryCodeValue: ''
  });

  const [document, setDocument] = useState<File[] | string[]>([]);
  
  const updateRequest = (isSaveDraft: boolean = false): void => {
    console.log(isSaveDraft)
    handleCompleteStep(1)
    setCurrentStep(2)
  }

  const getData = () => {
    if (data == null || !Object.keys(data).length) return
    //TODO SET ALL THE STATES ON INSIDE THIS FUNCTION
  }
  
    const handleAccountChange = (selectedOption: { value: string; label: JSX.Element | string } | null) => {
      setAccount(selectedOption ? selectedOption.value : '');
    };

    const handleChangeMobileNumber = (value: string, key: string) => {
      setMobileNumber(prev => ({
        ...prev,
        [key]: value
      }));
    };

  const handleDocumentChange = (files: File[]) => setDocument(files);
  
  useEffect(getData, [data])
  return (
    <div className="steeper-form-container">
      <div className="main-form">
    <ArenaInput
      onChange={(value: string) => setFirstName(value)}
      size="medium"
      placeholder="e.g. FirstName"
      label="FirstName"
      value={firstName}
      showClearIcon={!!firstName}
      required={true}
    />

    <ArenaInput
      onChange={(value: number) => setNumber(value)}
      size="medium"
      placeholder="e.g. Number"
      label="Number"
      value={number}
      showClearIcon={!!number}
      required={true}
    />

    <SelectGroup
      placeholder="Select"
      required={true}
      options={[{ groupName: '', list: accountOptions }]}
      onChange={handleAccountChange}
      value={accountOptions.find(option => option.value === account) || null}
      isMultiple={false}
      label="Account"
      withSearch={false}
      errorMsg={''}
      size="large"
    />

    <PhoneNumber
      phoneNumPlaceholder="79 000 0000"
      label="MobileNumber"
      size="large"
      required={true}
      countryCodeValue={mobileNumber.countryCodeValue}
      phoneNumberValue={mobileNumber.phoneNumberValue}
      onCountryCodeChange={(value: string) => handleChangeMobileNumber(value, 'countryCodeValue')}
      onPhoneNumberChange={(value: string) => handleChangeMobileNumber(value, 'phoneNumberValue')}
      errorMessage=""
    />

  <FileUploader
    multiple
    withPreview
    withFileName
    fileName="document"
    onChange={handleDocumentChange}
    acceptedFileExtensions="image/jpg, image/png, image/jpeg"
    size="medium"
    label={
      <CustomLabel
        label="Document"
        note="(You can upload multiple files in the formats PDF, PNG, and JPG)"
        required
      />
    }
    placeholder="e.g Document"
    value={document}
    required={false}
  />
  </div>

      <div className="footer-steeper-form">
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate('/loan/loan-management')}
          >
            Cancel
          </Button>
        </div>
        <div className="actions">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => updateRequest(true)}
            disabled={false}
          >
            Save Draft
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              updateRequest()
            }}
            disabled={false}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FirstForm

