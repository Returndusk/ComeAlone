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
import image1 from '../../assets/1.jpg';
import image2 from '../../assets/2.jpg';
import image3 from '../../assets/3.jpg';
import image4 from '../../assets/4.jpg';
import image5 from '../../assets/5.jpg';
import image6 from '../../assets/6.jpg';
import image7 from '../../assets/7.jpg';
import image8 from '../../assets/8.jpg';
import image9 from '../../assets/9.jpg';
import image10 from '../../assets/10.jpg';

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

  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10
  ];

  const destinations = images.map((image, index) => ({
    id: index,
    image1: image,
    title: '' // title을 추가합니다. (빈 문자열이거나, 적절한 값을 넣을 수 있습니다.)
  }));

  const fadeSettings = {
    dots: false,
    arrows: false,
    fade: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  return (
    <div className={styles.layout}>
      <SliderBanner
        settings={fadeSettings}
        destinations={destinations}
        showTitleAndOverview={false}
      />
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
