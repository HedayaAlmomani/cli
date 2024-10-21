import React, { createContext, useState, ReactElement, useEffect } from "react";
//@ts-ignore
import {
  Stepper,
  ArenaInput,
  //@ts-ignore
} from "@arena/components";
import BackArrowComponent from "../components/BackArrowComponent";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { ContextData, LookupData } from "../types/index";
import { stepperInfo, stepsMap } from "../constant";
import { getSpecificLoanService, getSpecificTaskById } from "../services";
//@ts-ignore
import { Utils } from "@arena/common-web";
import "./style.scss";
//@ts-ignore
FormsImports;
//@ts-ignore
export const StepperContext = createContext<StepperContextData>();
const StepperPage = () => {
  const params = new URLSearchParams(location.search);
  const maxStep: string | null = params.get("maxStep");
  const requestStatus: string | null = params.get("requestStatus");
  const taskId: string | null = params.get("actionId"); // this id for workflow task id
  const id: string | null = params.get("id"); // this loan id
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [data, setData] = useState<{}>({});
  const [recordId, setRecordId] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(true);
  const [completedSteps, setCompletedSteps] = useState<number[]>([
    1, 2, 3, 4, 5,
  ]);
  const [currency, setCurrency] = useState<string>("");
  const isEditForm = !!id && maxStep && requestStatus === "Draft";
  const handleCompleteStep = (stepIndex: number) => {
    setCompletedSteps((prevCompletedSteps) => [
      ...prevCompletedSteps,
      stepIndex,
    ]);
  };

  const closeDialog = () => setOpenDialog(false);

  const createArray = (num: number) =>
    Array.from({ length: num + 1 }, (_, i) => i);

  const handleCurrentStep = (step?: number) => {
    const isAddForm = !maxStep || !id || requestStatus !== "Draft";
    if (isAddForm) return;

    const currentStep = step ?? stepsMap[maxStep as keyof typeof stepsMap];
    setCompletedSteps(createArray(currentStep - 1));
    setCurrentStep(currentStep);
    setRecordId(id);
  };

  const getLoanData = (id: string) => {
    getSpecificLoanService({
      loanId: id,
    }).then((data) => {
      setData(data?.loanModel);
    });
  };

  const getWorkflowTaskById = () => {
    if (taskId && !id) {
      getSpecificTaskById({
        id: taskId,
        options: { withLoader: true },
      }).then((data: { data: Record<string, string | null> }) => {
        setData(data?.data);
      });
    }
  };
  // function to format lookup data into desired structure
  const formatLookupData = (lookupData: LookupData) => {
    return lookupData?.data?.valueEntities?.map(
      ({ key, value }: { key: string; value: string }) => ({
        value: key,
        label: value,
      })
    );
  };

  const getCurrency = async () => {
    const bankConfiguration = await Utils.queryLookup("BANK_CONFIGURATION");
    const currentCurrency = formatLookupData(bankConfiguration)?.find(
      (item) => item.value === "CURRENCY"
    )?.label;

    if (currentCurrency) {
      setCurrency(currentCurrency);
    }
  };

  useEffect(() => {
    getCurrency();
  }, []);

  const contextValue: ContextData = {
    currentStep,
    setCurrentStep,
    handleCompleteStep,
    completedSteps,
    recordId,
    setRecordId,
    setData,
    data,
    currency,
  };

  interface StepComponentProps {}

  const stepsComponents: ReactElement<StepComponentProps>[] = [
    StepsComponentData,
  ];
  const StepComponent = stepsComponents[currentStep];
  const scrollTop = () => {
    const mainContainer = document.getElementById(
      "stepper-components-container-id"
    );
    if (mainContainer) {
      mainContainer.scrollTo({ top: 0 });
    }
  };
  useEffect(handleCurrentStep, []);

  useEffect(() => {
    scrollTop();
    if (id || recordId) {
      getLoanData(id || recordId);
    }
  }, [currentStep]);

  useEffect(() => {
    scrollTop();
    if (taskId) {
      getWorkflowTaskById();
    }
  }, []);

  return (
    <StepperContext.Provider value={contextValue}>
      {isEditForm && (
        <ConfirmationDialog
          open={openDialog}
          onClose={closeDialog}
          currentStep={stepsMap[maxStep as keyof typeof stepsMap] + 1}
          handleSubmit={() => {
            setCurrentStep(0);
            closeDialog();
          }}
        />
      )}
      <div className="steeper-layout-container">
        <div className="steeper-layout">
          <div className="stepper-section">
            <BackArrowComponent
              completedSteps={completedSteps}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
            <Stepper
              stepperInfo={stepperInfo}
              completedSteps={completedSteps}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              direction="vertical"
            />
          </div>
          <div
            className="stepper-components-container"
            id="stepper-components-container-id"
          >
            <div className="loan-header">Loan Request</div>
            <div id="stepComponentSection" className="current-step-container">
              {StepComponent}
            </div>
          </div>
        </div>
      </div>
    </StepperContext.Provider>
  );
};

export default StepperPage;
