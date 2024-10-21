export interface ProfileDetails {
  custId: string;
  civilId: string;
  email: string;
  firstNameEn: string;
  lastNameEn: string;
  middleNameEn: string;
  mobileNo: string;
  mobileNumberCountryCode: string;
  country: string;
  city: string;
  area: string;
  streetName: string;
  buildingNo: string;
  floorNo: string;
  flatNo: string;
  poBox: string;
  zipCode: string;
  addressDescription: string;
}

export interface Options {
  value: string;
  label: string | JSX.Element;
}

export interface LookupResult {
  key: string;
  value: string;
}
export interface LookupData {
  data?: Record<string, LookupResult[] | []>;
}

export interface Option {
  value: string;
  label: string | JSX.Element;
}
export type DataOptions = { value: string; label: string }[] | undefined;

export type ContextData = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  handleCompleteStep: (value: number) => void;
  recordId: string;
  setRecordId: React.Dispatch<React.SetStateAction<string>>;
  data?: Record<string, any>;
  setData: React.Dispatch<React.SetStateAction<any>>;
  currency?: string;
  completedSteps?: number[];
};

export interface TimeLineData {
  userName?: string;
  email?: string;
  time?: string;
  comment?: string;
  workflowAction?: string;
}

export type DocumentsResponse = string[];
export type FormSettingsType = Record<
  string,
  string | boolean | Record<string, string>
>[];
