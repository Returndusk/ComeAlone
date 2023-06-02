import React, { useState, ChangeEvent } from 'react';
import styles from './SearchArea.module.scss';
import mainImage from './samplemain.jpg';
import { Container, InputAdornment, TextField } from '@mui/material';
import { BiSearch } from 'react-icons/bi';

function SearchArea() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
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
            label='Search'
            value={searchTerm}
            onChange={handleChange}
            sx={{ width: 600 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <BiSearch />
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
