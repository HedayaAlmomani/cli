const formTemplate = `
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
module.exports = { formTemplate };
