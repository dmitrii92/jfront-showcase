export interface Feature {
  featureId: number;
  featureName: string;
  featureNameEn: string;
  description: string;
  dateIns: Date;
  featureStatus: {
    name: string;
    value: number
  };
  author: {
    name: string;
    value: number;
  };
  responsible: {
    name: string;
    value: number;
  };
}