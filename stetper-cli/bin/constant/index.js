const formTemplate = `
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
import CustomLabel from '../CustomLabel'
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
  MyStates
  const updateRequest = (isSaveDraft: boolean = false): void => {
    console.log(isSaveDraft)
    handleCompleteStep(1)
    setCurrentStep(2)
  }

  const getData = () => {
    if (data == null || !Object.keys(data).length) return
    //TODO SET ALL THE STATES ON INSIDE THIS FUNCTION
  }
  MyFunctions
  useEffect(getData, [data])
  return (
    <div className="steeper-form-container">
      <div className="main-form">MyElements</div>

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

`;


const defaultStyle = `
.steeper-form-container {
  padding: 20px;
  display: flex;

  .main-form {
    width: calc(100% - 738px);
  }

  .footer-steeper-form {
    z-index: 1;
    position: fixed;
    background-color: #fff;
    bottom: 0;
    right: 0;
    height: 70px;
    padding: 12px 30px 12px 30px;
    border-top: 1px solid #d8dae5;
    width: calc(100% - 288px);
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    [class^="customBtn"] {
      width: 202px;
    }
    .actions {
      display: flex;
      flex-direction: row;
      gap: 20px;
    }
  }
}


`
const formTemplate2 = `
import React, { useState } from "react";
//@ts-ignore
import { ArenaInput, PhoneNumber, FileUploader } from "@arena/components";
//@ts-ignore
import { SelectGroup } from "digitinary-ui";
import CustomLabel from "../../components/CustomLabel"

const MySimpleForm = () => {
   MyStates

  MyFunctions
  const handleSubmit = () => {};

  return <form onSubmit={handleSubmit}>
     MyElements 
    </form>;
};

export default MySimpleForm;
`;
module.exports = { formTemplate ,defaultStyle};
