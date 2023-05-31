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
  }[];
}

function Weather() {
  const [temp, setTemp] = useState<number>(0);
  const [icon, setIcon] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const cityName = 'Jeju';
    const apiKey = process.env.REACT_APP_WEATHER_KEY;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    axios
      .get<WeatherData>(url)
      .then((res) => {
        const data = res.data;
        const tempInCelsius = Math.round(data.main.temp - 273.15);
        setTemp(tempInCelsius);
        setIcon(data.weather[0].icon);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const imgSrc = `http://openweathermap.com/img/w/${icon}.png`;

  if (loading) {
    return <p>Loading</p>;
  } else {
    return (
      <div className={styles.weather}>
        <a
          href='https://www.kma.go.kr/jeju/html/main/index.jsp'
          target='_blank'
          rel='noreferrer'
        >
          <img src={imgSrc} alt='Weather Icon' />
          {temp}°C
        </a>
      </div>
    );
  }
}

export default Weather;
