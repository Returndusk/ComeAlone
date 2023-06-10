import React, { useState, ChangeEvent } from 'react';
import styles from './SearchArea.module.scss';
import {
  Container,
  InputAdornment,
  TextField,
  IconButton
} from '@mui/material';
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import SliderBanner from './SliderBanner';

const images = [
  require('../../assets/1.jpg'),
  require('../../assets/2.jpg'),
  require('../../assets/3.jpg'),
  require('../../assets/4.jpg'),
  require('../../assets/5.jpg'),
  require('../../assets/6.jpg'),
  require('../../assets/7.jpg'),
  require('../../assets/8.jpg'),
  require('../../assets/9.jpg'),
  require('../../assets/10.jpg')
];

function SearchArea() {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
    setHasError(false);
  };

  const handleSearch = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      performSearch();
    }
  };

  const handleIconClick = () => {
    performSearch();
  };

  const performSearch = () => {
    if (searchTerm && searchTerm.trim() !== '') {
      navigate(`/destination/list?search=${searchTerm}`);
    } else {
      setHasError(true);
    }
  };

  const destinations = images.map((image, index) => ({
    id: index,
    image1: image,
    title: ''
  }));

  const fadeSettings = {
    dots: false,
    arrows: false,
    fade: true,
    infinite: true,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 15000
  };

  return (
    <div className={styles.layout}>
      <SliderBanner
        settings={fadeSettings}
        destinations={destinations}
        showTitleAndOverview={false}
        customClassName='TopSlider'
        boxClassName='custom-box'
        imageContainerClassName='custom-image-container'
      />
      <div className={styles.searchArea}>
        <Container maxWidth='md' sx={{ mt: 1 }}>
          <TextField
            id='search'
            type='search'
            label='목적지명을 입력해 주세요.'
            value={searchTerm || ''}
            onChange={handleChange}
            onKeyDown={handleSearch}
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
