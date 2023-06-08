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
  api: string;
  urlTemplate?: string;
}

export interface Destination {
  id?: number;
  title: string;
  image1?: string;
  schedule_id?: number;
  overview?: string;
}