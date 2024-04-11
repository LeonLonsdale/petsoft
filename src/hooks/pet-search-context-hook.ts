import { SearchContext } from '@/contexts/search-context-provider';
import { useContext } from 'react';

export const useSearchContext = () => {
  const value = useContext(SearchContext);
  if (!value)
    throw new Error(
      'You have used SearchContext outside of its Provider. SearchContext can only be used within a child of the SearchContextProvider',
    );
  return value;
};
