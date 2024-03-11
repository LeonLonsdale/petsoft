'use client';

import { createContext, useContext, useState } from 'react';

type TSearchContext = {
  searchText: string | null;
  handleChangeSearchText: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type TSearchContextProviderProps = {
  children: React.ReactNode;
};

const SearchContext = createContext<TSearchContext | null>(null);

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

const useSearchContext = () => {
  const value = useContext(SearchContext);
  if (!value)
    throw new Error(
      'You have used SearchContext outside of its Provider. SearchContext can only be used within a child of the SearchContextProvider',
    );
  return value;
};

export { useSearchContext, SearchContextProvider };
