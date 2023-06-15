import React, { useState, ChangeEvent } from 'react';
import styles from './SearchArea.module.scss';
import { InputAdornment, TextField, IconButton } from '@mui/material';
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import SliderBanner from './SliderBanner';
import image from '../../constants/image';

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

  const destinations = image.map((image, index) => ({
    id: index,
    image1: image,
    title: ''
  }));

  const fadeSettings = {
    dots: false,
    arrows: false,
    fade: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false
  };

  return (
    <>
      <figure className={styles.banner}>
        <div className={styles.slider}>
          <SliderBanner
            settings={fadeSettings}
            destinations={destinations}
            showTitleAndOverview={false}
            customClassName='fadeInSlider'
            boxClassName='customBox'
            imageContainerClassName='customImageContainer'
          />
        </div>
        <div className={styles.bannerText}>
          <h1>제주, 나 혼자서예!</h1>
          <p>혼자 여행하는 당신을 위한 완벽한 동반자</p>
        </div>
      </figure>
      <div className={styles.searchArea}>
        <TextField
          id='search'
          type='search'
          label='목적지명을 입력해 주세요.'
          className={styles.inputField}
          value={searchTerm || ''}
          onChange={handleChange}
          onKeyDown={handleSearch}
          sx={{
            width: '100%',
            '& label.Mui-focused': { display: 'none' }
          }}
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
      </div>
    </>
  );
}

export default SearchArea;
