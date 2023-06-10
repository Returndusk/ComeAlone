export interface SliderComponentProps {
  settings?: {
    arrows?: boolean;
    dots?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    autoplay?: boolean;
    autoplaySpeed?: number;
  };
  api?: string;
  urlTemplate?: string;
}

export interface Destination {
  id?: number;
  schedule_id?: number;
  title?: string;
  image1?: string;
  overview?: string;
  [key: string]: string | number | undefined;
}

export interface SliderBannerProps extends SliderComponentProps {
  destinations?: Destination[];
  showTitleAndOverview?: boolean;
  idProperty?: keyof Destination;
  titleProperty?: keyof Destination;
  imageProperty?: keyof Destination;
  overviewProperty?: keyof Destination;
  customClassName?: string;
  boxClassName?: string;
  imageContainerClassName?: string;
  textClassName?: string;
  showCategory?: boolean;
}