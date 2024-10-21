import React from "react";
import "./style.scss";
interface CustomLabel {
  label?: string;
  note?: string;
  required?: boolean;
}
const CustomLabel = ({ label, note, required = false }: CustomLabel) => {
  return (
    <div className="custom-label-note">
      <div className="label">
        {label}
        {required && <span className="required-star">*</span>}
      </div>
      <div className="note">{note}</div>
    </div>
  );
};

export default CustomLabel;
