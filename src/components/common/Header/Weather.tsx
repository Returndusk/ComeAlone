import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Header.module.scss';

interface WeatherData {
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
    id: number;
  }[];
}

function Weather() {
  const [temp, setTemp] = useState<number>(0);
  const [icon, setIcon] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const cityName = 'Jeju';
    const apiKey = process.env.REACT_APP_WEATHER_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    axios
      .get<WeatherData>(url)
      .then((res) => {
        const data = res.data;
        const tempInCelsius = Math.round(data.main.temp - 273.15);
        setTemp(tempInCelsius);
        setIcon(getWeatherIcon(data.weather[0].id));
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const getWeatherIcon = (id: number) => {
    if (id >= 200 && id < 300) {
      return 'https://help.apple.com/assets/640A52196275DE31D4371B5E/640A52226275DE31D4371B8B/ko_KR/efffb1e26f6de5bf5c8adbd872a2933a.png';
    } else if (id >= 300 && id < 400) {
      return 'https://help.apple.com/assets/640A52196275DE31D4371B5E/640A52226275DE31D4371B8B/ko_KR/a55fef55bbeb0762a8dd329b4b8ad342.png';
    } else if (id >= 500 && id < 600) {
      return 'https://help.apple.com/assets/640A52196275DE31D4371B5E/640A52226275DE31D4371B8B/ko_KR/4417bf88c7bbcd8e24fb78ee6479b362.png';
    } else if (id >= 600 && id < 700) {
      return 'https://help.apple.com/assets/640A52196275DE31D4371B5E/640A52226275DE31D4371B8B/ko_KR/00171e3b54b97dee8c1a2f6a62272640.png';
    } else if (id >= 700 && id < 800) {
      return 'https://help.apple.com/assets/640A52196275DE31D4371B5E/640A52226275DE31D4371B8B/ko_KR/d35bb25d12281cd9ee5ce78a98cd2aa7.png';
    } else if (id === 800) {
      return 'https://help.apple.com/assets/640A52196275DE31D4371B5E/640A52226275DE31D4371B8B/ko_KR/575900edccbc7def167f7874c02aeb0b.png';
    } else if (id >= 801 && id <= 804) {
      return 'https://help.apple.com/assets/640A52196275DE31D4371B5E/640A52226275DE31D4371B8B/ko_KR/66117fab0f288a2867b340fa2fcde31b.png';
    } else {
      return '';
    }
  };

  const imgSrc = icon;

  if (loading) {
    return null;
  } else {
    return (
      <div className={styles.weather}>
        <a
          href='https://www.kma.go.kr/jeju/html/main/index.jsp'
          target='_blank'
          rel='noreferrer'
        >
          <img src={imgSrc} alt='Weather Icon' title='제주시 현재 날씨. 클릭 시 제주지방기상청이 연결됩니다. ' />
          {temp}°
        </a>
      </div>
    );
  }
}

export default Weather;
