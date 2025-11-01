export interface MgnregaDataMonth {
  year: number;
  month: string;
  monthIndex: number;
  personDaysGenerated: number;
  totalFunds: number;
  fundsUtilised: number;
  worksCompleted: {
    total: number;
    agriculture: number;
    infrastructure: number;
  };
}

export interface DistrictData {
  [district: string]: MgnregaDataMonth[];
}

export interface StateData {
  [state: string]: DistrictData;
}
