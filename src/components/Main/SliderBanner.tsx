import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './SliderBanner.module.scss';
import { SliderBannerProps, Destination } from '../../types/SliderBannerTypes';
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl';

interface NextArrowProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function NextArrow({ onClick }: NextArrowProps) {
  return (
    <button
      className={`${styles.arrowBtn} ${styles.nextBtn}`}
      onClick={onClick}
    >
      <SlArrowRight />
    </button>
  );
}

function PrevArrow({ onClick }: NextArrowProps) {
  return (
    <button
      className={`${styles.arrowBtn} ${styles.prevBtn}`}
      onClick={onClick}
    >
      <SlArrowLeft />
    </button>
  );
}

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
  customClassName,
  boxClassName,
  imageContainerClassName,
  textClassName,
  showCategory = false
}: SliderBannerProps): JSX.Element {
  const defaultSettings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  const [destinations, setDestinations] = useState<Destination[]>([]);
  const navigate = useNavigate();
  const categoryMapping: { [key: number]: string } = {
    12: '관광지',
    14: '문화시설',
    15: '축제공연행사',
    25: '여행코스',
    28: '레포츠',
    32: '숙박',
    38: '쇼핑',
    39: '음식점'
  };

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
        navigate(url);
      }
    }
  };

  return (
    <div
      className={`${styles.container} ${
        customClassName && styles[customClassName]
          ? styles[customClassName]
          : ''
      }`}
    >
      <Slider {...finalSettings}>
        {destinations.map((destination, index) => (
          <div
            key={`destination-${String(destination[idProperty]) || index}`}
            className={`${styles.box} ${
              boxClassName && styles[boxClassName] ? styles[boxClassName] : ''
            }`}
            onClick={() => handleBannerClick(destination)}
          >
            <div
              className={`${
                imageContainerClassName && styles[imageContainerClassName]
                  ? styles[imageContainerClassName]
                  : styles.imageContainer
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
              ></img>
              {showCategory && destination.destination_category_id && (
                <span
                  className={`${styles.category} ${
                    styles['category-' + destination.destination_category_id]
                  }`}
                >
                  {categoryMapping[Number(destination.destination_category_id)]}
                </span>
              )}

              {showTitleAndOverview && (
                <div
                  className={`${styles.text} ${
                    textClassName && styles[textClassName]
                      ? styles[textClassName]
                      : ''
                  }`}
                >
                  <h3>{String(destination[titleProperty])}</h3>
                  <p>
                    {destination[overviewProperty] &&
                      typeof destination[overviewProperty] === 'string' &&
                      String(destination[overviewProperty])}
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
