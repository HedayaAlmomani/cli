//@ts-ignore
import React from "react";
//@ts-ignore
import { Dialog, Button } from "digitinary-ui";
// @ts-ignore
import { ArenaInput, CloseIcon, InfoIconOnboard } from "@arena/components";
import "./style.scss";

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  handleSubmit: () => void;
  currentStep: number;
}

const ConfirmationDialog = ({
  open,
  onClose,
  handleSubmit,
  currentStep,
}: ConfirmationDialogProps) => {
  return (
    <div className="save-draft-dialog">
      <Dialog
        open={open}
        onClose={onClose}
        content={
          <div className="save-draft-dialog-content">
            <div className="lead-score-dialog-header-container">
              <CloseIcon
                className="close-icon"
                title={"Close"}
                height={24}
                width={24}
                onClick={onClose}
              />
            </div>

            <div className="dialog-body-container">
              <div className="info-icon-container">
                <InfoIconOnboard height={65} width={65} />
              </div>
              <div className="note-container">
                You've successfully finished Step
                <span className="current-step">{` ${currentStep}`}</span>.
                <div>Would you like to start from Step 1?</div>
              </div>
              <div className="save-draft-input"></div>
            </div>

            <div className="save-draft-dialog-footer">
              <Button
                className="cancel-action-btn"
                disabled={false}
                loading={false}
                variant="outlined"
                color="action"
                fullWidth={false}
                onClick={onClose}
              >
                No
              </Button>
              <Button
                className="save-action-btn"
                loading={false}
                variant="contained"
                color="error"
                fullWidth={false}
                onClick={() => {
                  handleSubmit();
                }}
              >
                Yes
              </Button>
            </div>
          </div>
        }
        position="center"
        size="xs"
        disableOverlay={false}
        disableBackdropClick={true}
        fullWidth={false}
        scroll="root"
      />
    </div>
  );
};

export default ConfirmationDialog;
