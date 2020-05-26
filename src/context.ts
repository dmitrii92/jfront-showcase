import React from "react";

export interface SearchContextInterface {
  getSearch(): string,
  setSearch(searchId: string): void
}

export const SearchContext = React.createContext<SearchContextInterface | null>(null);
