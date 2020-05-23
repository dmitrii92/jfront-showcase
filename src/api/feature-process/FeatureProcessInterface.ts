export type FeatureProcess = {
  featureId: number;
  featureProcessId: number;
  featureStatusCode: string;
  featureStatusName: string;
  dateIns: Date;
}

export type FeatureProcessCreate = {
  featureStatusCode: string;
}
