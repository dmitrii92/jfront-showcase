import React from "react";
import styled from "styled-components";


export const Table = styled.table`
  box-sizing: border-box;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  table-layout: fixed;
  width: 100%;
  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {
    border: 0;
  }
`;

interface TableBodyProps {
  height?: string;
}

export const TableBody = styled.tbody<TableBodyProps>`
  width: 100%;
  // display: block;
  // ${props => props.height ? `position: absolute; height: ${props.height}; right: -17px; width: calc(100% + 17px);` : ''};
  // z-index: 1;
`;

export const TableHeader = styled.thead`
  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {
    display: none; 
  }
`;

export const TableHeaderCell = styled.th`
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  padding-bottom: 3px;
  padding-left: 5px;
  padding-right: 3px;
  padding-top: 3px;
  text-align: left;
  color: black;
  text-shadow: none;
  font: 11px tahoma, arial, verdana, sans-serif;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  background-color: #ededed;
  padding: .625em;
  text-align: center;
`;

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean
}

export const TableRow = styled.tr<TableRowProps>`
  padding: .35em;
  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {
    display: block;
    margin-bottom: .625em;
    border-bottom: 1px solid #ddd;
  }
  ${props => props.selected ? `background: #dfe8f6;` : `
    background: #fff;
    &:nth-child(odd) {
      background: #fafafa;
    }
    &:hover {
      background: #eee;
    }
  `}
`;

export interface TableColumnProps extends React.HTMLAttributes<HTMLTableCellElement> {
  label?: string
}

export const TableColumn = styled.td<TableColumnProps>`
  padding: .625em;
  @media only screen and (min-width: 761px) {
    padding-bottom: 3px;
    padding-left: 5px;
    padding-right: 3px;
    padding-top: 3px;
    overflow: hidden;
    font: 11px tahoma, arial, verdana, sans-serif;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-collapse: collapse;
    border-bottom-color: #ededed;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-left-color: #ededed;
    border-left-style: solid;
    border-left-width: 0;
    border-right-color: #ededed;
    border-right-style: solid;
    border-right-width: 0;
    border-top-color: #fafafa;
    border-top-style: solid;
    border-top-width: 1px;
  }
  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {
    display: block;
    font-size: .8em;
    &::before {    
      display: inline-block;
      content: "${props => props.label ? `${props.label}:` : ''}";
      padding-right: 5px;
    }
  }
`;

export default Table;