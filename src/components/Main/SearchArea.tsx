import React, { useState, ChangeEvent } from 'react';
import styles from './SearchArea.module.scss';
import mainImage from './samplemain.jpg';
import {
  Container,
  InputAdornment,
  TextField,
  IconButton
} from '@mui/material';
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

function SearchArea() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setHasError(false);
  };

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (searchTerm.trim() === '') {
        setHasError(true);
      } else {
        navigate(`/destination/list?search=${searchTerm}`);
      }
    }
  };

  const handleIconClick = () => {
    if (searchTerm.trim() === '') {
      setHasError(true);
    } else {
      navigate(`/destination/list?search=${searchTerm}`);
    }
  };

  return (
    <div className={styles.layout}>
      <div className={styles.imgArea}>
        <img src={mainImage} alt='' />
      </div>
      <div className={styles.searchArea}>
        <Container maxWidth='md' sx={{ mt: 1 }}>
          <TextField
            id='search'
            type='search'
            label='목적지명을 입력해 주세요.'
            value={searchTerm}
            onChange={handleChange}
            onKeyPress={handleSearch}
            sx={{ width: 600 }}
            error={hasError}
            helperText={hasError ? '빈 칸을 채워주세요.' : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={handleIconClick}>
                    <BiSearch />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Container>
      </div>
    </div>
  );
}

export default SearchArea;
