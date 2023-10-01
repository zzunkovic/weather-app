import { ReactNode } from "react";
import Slider from "react-slick";

type SliderComponentProps = {
  children: ReactNode;
  slidesToShow: number;
  showArrows: boolean;
};

const SliderComponent: React.FC<SliderComponentProps> = ({
  children,
  slidesToShow,
  showArrows,
}) => {
  const settings = {
    dots: false,
    infinite: false,
    autoplay: true,
    autoplaySpeed: 10000,
    slidesToScroll: 1,
    slidesToShow: slidesToShow,
    arrows: showArrows,
    swipeToSlide: true,
    swipe: true,
  };

  return <Slider {...settings}>{children}</Slider>;
};

export default SliderComponent;
