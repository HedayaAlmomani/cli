import React from "react";
//@ts-ignore
import { BackArrow, BackArrowArabic } from "@arena/components";
//@ts-ignore
import { CacheService } from "@arena/common-web";
//@ts-ignore
import { useNavigate } from "react-router-dom";
const language = CacheService.get("language");
import "./style.scss";

const BackArrowComponent = ({
  currentStep,
  setCurrentStep,
  completedSteps,
}: {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  completedSteps: number[];
}) => {
  const navigate = useNavigate();

  return (
    <div className="back-section-container">
      {language === "en" ? (
        <BackArrow
          onClick={() => {
            if (currentStep === 0) {
              navigate(-1);
            } else if (!completedSteps.includes(currentStep - 1)) {
              navigate(-1);
            } else {
              setCurrentStep(currentStep - 1);
            }
          }}
          width={32}
          height={32}
        />
      ) : (
        <BackArrowArabic
          onClick={() => {
            if (currentStep === 0) {
              navigate(-1);
            } else if (!completedSteps.includes(currentStep - 1)) {
              navigate(-1);
            } else {
              setCurrentStep(currentStep - 1);
            }
          }}
          width={32}
          height={32}
        />
      )}
    </div>
  );
};

export default BackArrowComponent;
