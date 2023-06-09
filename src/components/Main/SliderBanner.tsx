import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './SliderBanner.module.scss';
import { SliderBannerProps, Destination } from '../../types/SliderBannerTypes';

function SliderBanner({
  settings,
  api,
  urlTemplate,
  destinations: destinationsProp,
  showTitleAndOverview = true,
  idProperty = 'id',
  titleProperty = 'title',
  imageProperty = 'image1',
  overviewProperty = 'overview',
  className,
  boxClassName,
  imageContainerClassName,
  textClassName
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
      const url = urlTemplate.replace(/{(\w+)}/g, (match, key) => {
        return String(data[key] || '');
      });

      if (url) {
        window.location.href = url;
      }
    }
  };

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <Slider {...finalSettings}>
        {destinations.map((destination, index) => (
          <div
            key={`destination-${String(destination[idProperty]) || index}`}
            className={`${styles.box} ${boxClassName || ''}`}
            onClick={() => handleBannerClick(destination)}
          >
            <div
              className={`${styles.imageContainer} ${
                imageContainerClassName || ''
              }`}
            >
              <img
                src={
                  destination[imageProperty] &&
                  String(destination[imageProperty]).trim() !== ''
                    ? String(destination[imageProperty])
                    : 'https://image.utoimage.com/preview/cp872655/2021/05/202105029544_500.jpg'
                }
                alt={String(destination[titleProperty]) || ''}
              />
              {showTitleAndOverview && (
                <div className={`${styles.text} ${textClassName || ''}`}>
                  <h3>{String(destination[titleProperty])}</h3>
                  <p>
                    {destination[overviewProperty] &&
                    typeof destination[overviewProperty] === 'string'
                      ? (destination[overviewProperty] as string).length > 20
                        ? (destination[overviewProperty] as string).slice(
                            0,
                            62
                          ) + '...'
                        : destination[overviewProperty]
                      : String(destination[overviewProperty])}
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
