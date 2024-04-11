'use client';

import { createContext, useState } from 'react';

type TSearchContext = {
  searchText: string | null;
  handleChangeSearchText: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type TSearchContextProviderProps = {
  children: React.ReactNode;
};

export const SearchContext = createContext<TSearchContext | null>(null);

const SearchContextProvider = ({ children }: TSearchContextProviderProps) => {
  // state
  const [searchText, setSearchText] = useState<string | null>(null);

  // derived state

  // event handlers
  const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchText(e.target.value);

  return (
    <SearchContext.Provider
      value={{
        searchText,
        handleChangeSearchText,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContextProvider };
