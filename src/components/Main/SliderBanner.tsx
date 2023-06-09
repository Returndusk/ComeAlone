import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './SliderBanner.module.scss';
import {
  SliderComponentProps,
  Destination
} from '../../types/SliderBannerTypes';

interface SliderBannerProps extends SliderComponentProps {
  api?: string;
  destinations?: Destination[];
  showTitleAndOverview?: boolean;
}

function SliderBanner({
  settings,
  api,
  urlTemplate,
  destinations: destinationsProp,
  showTitleAndOverview = true
}: SliderBannerProps): JSX.Element {
  const defaultSettings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 5000
  };

  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    if (api) {
      const fetchDestinations = async () => {
        try {
          const res = await axios.get<Destination[]>(api);
          setDestinations(res.data);
        } catch (error) {
          console.error('Failed to fetch destinations', error);
        }
      };
      fetchDestinations();
    } else if (destinationsProp) {
      setDestinations(destinationsProp);
    }
  }, [api, destinationsProp]);

  const finalSettings = { ...defaultSettings, ...settings };

  const handleBannerClick = (data: Destination): void => {
    if (urlTemplate) {
      let url;
      if (
        Object.prototype.hasOwnProperty.call(data, 'id') &&
        typeof data.id !== 'undefined'
      ) {
        url = urlTemplate
          .replace('{id}', data.id.toString())
          .replace('{title}', encodeURIComponent(data.title));
      } else if (
        Object.prototype.hasOwnProperty.call(data, 'schedule_id') &&
        typeof data.schedule_id !== 'undefined'
      ) {
        url = urlTemplate
          .replace('{schedule_id}', data.schedule_id.toString())
          .replace('{title}', encodeURIComponent(data.title));
      }
      if (url) {
        window.location.href = url;
      }
    }
  };

  return (
    <div className={styles.container}>
      <Slider {...finalSettings}>
        {destinations.map((destination, index) => (
          <div
            key={`destination-${
              destination.id || destination.schedule_id || index
            }`}
            className={styles.box}
            onClick={() => handleBannerClick(destination)}
          >
            <div className={styles.imageContainer}>
              <img
                src={
                  destination.image1 ||
                  'https://image.utoimage.com/preview/cp872655/2021/05/202105029544_500.jpg'
                }
                alt={destination.title}
              />
              {showTitleAndOverview && (
                <div className={styles.text}>
                  <h3>{destination.title}</h3>
                  <p>
                    {destination.overview && destination.overview.length > 20
                      ? destination.overview.slice(0, 62) + '...'
                      : destination.overview}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SliderBanner;
