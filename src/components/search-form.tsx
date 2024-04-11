'use client';

import { useSearchContext } from '@/hooks/pet-search-context-hook';

const SearchForm = () => {
  const { handleChangeSearchText, searchText } = useSearchContext();

  return (
    <search className='h-full w-full'>
      <form className='h-full w-full'>
        <input
          className='h-full w-full rounded-md bg-white/20 px-5 outline-none transition placeholder:text-white/50 hover:bg-white/30 focus:bg-white/50'
          type='search'
          placeholder='Search'
          onChange={handleChangeSearchText}
          value={searchText || ''}
        />
      </form>
    </search>
  );
};

export default SearchForm;
