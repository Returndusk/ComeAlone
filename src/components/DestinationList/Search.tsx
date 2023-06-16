import React, { useEffect, useMemo, useState } from 'react';
import { DestinationsType } from '../../types/DestinationListTypes';
import styles from './Search.module.scss';
import Category from './Category';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AlertModal from '../common/Alert/AlertModal';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { BiSearch } from 'react-icons/bi';

const ALERT_PROPS = {
  NulllishQueryMessage: '검색어를 입력해주세요.',
  showTitle: false
};

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rankedDestinations] = useState<DestinationsType[] | []>([]);
  const [isUserSearched, setIsUserSearched] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);
  const navigate = useNavigate();

  const searchQueryParam = useMemo(() => {
    return searchParams.get('search') ?? '';
  }, [searchParams]);

  const isNullishSearchInput = (input: string) => {
    const trimmedInput = input.replace(/ /g, '');
    return trimmedInput === '';
  };

  const handleSubmitQuery = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUserSearched(() => true);
    const submittedQuery = e.target.searchQuery.value;
    if (isNullishSearchInput(submittedQuery)) {
      setIsShowAlert(true);
      navigate('/destination/list');
      return;
    }
    const searchQueryString = encodeURIComponent(submittedQuery);
    if (searchQueryString !== null) {
      setSearchParams(`?search=${searchQueryString}`);
    }
    return;
  };

  useEffect(() => {
    setIsUserSearched(() => true);
  }, [setIsUserSearched, searchQueryParam]);

  const handleOnSearchQueryConfirm = () => {
    setIsShowAlert(false);
  };

  return (
    <>
      <div className={styles.filterContainer}>
        <div className={styles.searchContainer}>
          <form className={styles.searchBar} onSubmit={handleSubmitQuery}>
            <TextField
              className={styles.inputBar}
              type='text'
              name='searchQuery'
              placeholder='목적지를 입력해주세요.'
              style={{ width: '350px' }}
              size='small'
              defaultValue={searchQueryParam}
              key={searchQueryParam}
              sx={{
                width: '100%',
                '& label.Mui-focused': { color: '#ef6d00' },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#fe9036',
                    borderWidth: '1px'
                  }
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton type='submit'>
                      <BiSearch />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </form>
        </div>
        <Category
          rankedDestinations={rankedDestinations}
          isUserSearched={isUserSearched}
          searchQueryParam={searchQueryParam}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
      {isShowAlert && (
        <AlertModal
          message={ALERT_PROPS.NulllishQueryMessage}
          onConfirm={handleOnSearchQueryConfirm}
          showTitle={ALERT_PROPS.showTitle}
        />
      )}
    </>
  );
}

export default Search;
