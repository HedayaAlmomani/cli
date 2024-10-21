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

const FirstForm = () => {
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
  
  const [civilId, setCivilId] = useState<string | null>("");
  const [userNotFound, setUserNotFound] = useState<boolean>(true);
  const [alertError, setAlertError] = useState<boolean>(false);

  const createLoanRequest = (isSaveDraft: boolean = false) => {
    if (completedSteps && !completedSteps?.length) {
      // TODO CREATE REQUEST
    } else {
      handleCompleteStep(0);
      setCurrentStep(1);
      setRecordId(data?.loanId);
    }
    if (isSaveDraft) {
      // To Do
      navigate(-1);
    }
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
        <h1>Form 1</h1>
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
            onClick={() => createLoanRequest(true)}
            disabled={false}
          >
            Save Draft
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              createLoanRequest();
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

export default FirstForm;
