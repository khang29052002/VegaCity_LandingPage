import React from "react";
import BannerImage from "../Assets/Vega-City-Nha-Trang.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
         
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Khám Phá Cuộc Sống Sang Trọng Tại Vega City Nha Trang
          </h1>
          <div className="home-image-section">
          <img src={BannerImage} alt="Vega City Shophouse" />
        </div>
          <p className="primary-text">
            Tận hưởng vẻ đẹp và sự tiện nghi của Shophouse Vega City – nơi bạn có thể trải nghiệm cuộc sống ven biển độc quyền với thiết kế hiện đại và không gian sống tươi mới.
          </p>
          <button className="secondary-button">
            Khám Phá Ngay <FiArrowRight />{" "}
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Home;
