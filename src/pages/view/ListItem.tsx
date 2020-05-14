import React from "react";
import {Feature} from "../../api/FeatureInterface";

import "./List.css";

export const ListItem: React.FC<Feature> = (feature) => {
  return (
      <tr>
        <td>{feature.featureId}</td>
        <td></td>
        <td>{feature.featureStatus.name}</td>
        <td>{feature.featureName}</td>
        <td>{feature.featureNameEn}</td>
        <td>{feature.description}</td>
        <td>{feature.dateIns}</td>
        <td>{feature.author.name}</td>
        <td>{feature.responsible.name}</td>
      </tr>
  );
}