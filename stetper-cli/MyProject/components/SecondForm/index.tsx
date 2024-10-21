import React from "react";
import { useState, useContext, useRef, useEffect } from "react";
//@ts-ignore
import { Utils, currenciesIcons, scrollTop } from "@arena/common-web";
//@ts-ignore
import { ArenaInput, SearchIcon, PhoneNumber } from "@arena/components";
import AlertComponent from "../AlertComponent";
//@ts-ignore
import { Button } from "digitinary-ui";
//@ts-ignore
import { useNavigate } from "react-router-dom";
import { ContextData } from "../../types";
//@ts-ignore
import CustomLabel from "../CustomLabel";
import { StepperContext } from "../../stepperPage";
import "./style.scss";

const SecondForm = () => {
  const {
    handleCompleteStep,
    setCurrentStep,
    data,
    setRecordId,
    completedSteps,
  } = useContext<ContextData>(StepperContext);
  const navigate = useNavigate();
  const mainRequestDetailsRef = useRef(null);
  const params = new URLSearchParams(location.search);
  let id: string | null = params.get("id");

  const updateRequest = (isSaveDraft: boolean = false): void => {
    // updateLoanService({
    //   loanId,
    //   options: { withToast: true, withLoader: true },
    //   body:
    // }).then(() => {
    //   if (isSaveDraft) {
    //     navigate(-1);
    //   } else {
    //     handleCompleteStep(2);
    //     setCurrentStep(3);
    //   }
    // });
    handleCompleteStep(1);
    setCurrentStep(2);
  };

  const scroll = (scrollOffset: number = 0): void => {
    const scrollHeight =
      //@ts-ignore
      mainRequestDetailsRef?.current?.getBoundingClientRect();
    const container = document?.getElementById("stepComponentSection");
    if (container && scrollHeight) {
      container.scrollTo({
        top: scrollHeight.y - scrollOffset,
        behavior: "smooth",
      });
    }
  };

  const getData = () => {
    if (data == null || !Object.keys(data).length) return;
    //TODO SET ALL THE STATES ON INSIDE THIS FUNCTION
  };

  useEffect(getData, [data]);
  return (
    <div className="steeper-form-container">
      <div className="main-form">
        <h1>Form 2</h1>
      </div>

      <div className="footer-steeper-form">
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/loan/loan-management")}
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
              updateRequest();
            }}
            disabled={false}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecondForm;
