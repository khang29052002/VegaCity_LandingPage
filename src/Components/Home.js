import React from "react";
import BannerImage from "../Assets/Vega-City-Nha-Trang.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import LazyLoad from "react-lazyload";
const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-text-content">
          <h1 className="primary-heading-home">
            Khám Phá Cuộc Sống Sang Trọng Tại Vega City Nha Trang
          </h1>
          <p className="primary-text">
            Tận hưởng vẻ đẹp và sự tiện nghi của Shophouse Vega City – nơi bạn có thể trải nghiệm cuộc sống ven biển độc quyền với thiết kế hiện đại và không gian sống tươi mới.
          </p>
        </div>
        <div className="home-image-section">
          <LazyLoad height={200} offset={100} once>
            <img className="home-image" src={BannerImage} alt="Vega City Shophouse" />
          </LazyLoad>
        </div>
      </div>
      <div className="button-container">
        <button className="secondary-button">
          Khám Phá Ngay <FiArrowRight />{" "}
        </button>
      </div>
    </div>
  );
};

export default Home;
