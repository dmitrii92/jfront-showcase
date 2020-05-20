import React from "react";
import {Feature} from "../../api/FeatureInterface";

import {TableColumn, TableRow} from "../../components/table";

export const ListItem: React.FC<Feature> = (feature) => {
  return (
      <TableRow>
        <TableColumn label="Идентификатор">{feature.featureId}</TableColumn>
        <TableColumn label="Порядок выполнения"></TableColumn>
        <TableColumn label="Статус">{feature.featureStatus.name}</TableColumn>
        <TableColumn label="Наименование">{feature.featureName}</TableColumn>
        <TableColumn label="Наименование английское">{feature.featureNameEn}</TableColumn>
        <TableColumn label="Описание">{feature.description}</TableColumn>
        <TableColumn label="Дата создания">{feature.dateIns}</TableColumn>
        <TableColumn label="Автор">{feature.author.name}</TableColumn>
        <TableColumn label="Ответственный">{feature.responsible.name}</TableColumn>
      </TableRow>
  );
}