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

export type FeatureSearchTemplate = {
  featureId?: number;
  featureNameTemplate?: string;
  featureNameEnTemplate?: string;
  /*statusCodeList?: string[];
  authorId: number;
  responsibleId: number;
  dateInsFrom: Date;
  dateInsTo: Date;
  maxRowCount: number;*/
}