import React, { useState } from "react";
import AboutBackgroundImage from "../Assets/ban-do.png";
import { BsFillPlayCircleFill } from "react-icons/bs";
import LazyLoad from "react-lazyload";

const About = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section id="about" className="about-section-container">
      <div className="about-section-text-container">
        <p className="primary-subheading">Về Shophouse Vega City</p>
        <h1 className="primary-heading">
          Shophouse Vega City Nha Trang – Khu Phố Thương Mại Ven Biển Độc Đáo
        </h1>
        <div className="about-section-image-container">
          <LazyLoad height={200} offset={100} once>
            <img className="image-section" src={AboutBackgroundImage} alt="Vega City Shophouse" loading="lazy" />
          </LazyLoad>
        </div>
        <p className="primary-text">
          Mặt bằng chi tiết Shophouse Vega City nằm trên tổng diện tích 43.81Ha (bao gồm 2 giai đoạn, trong đó giai đoạn 1 là 15.61 Ha), mật độ xây dựng là 23.7%. Lấy concept là quần thể bất động sản phức hợp Nghệ thuật – nghỉ dưỡng – giải trí ven biển duy nhất và đầu tiên tại Nha Trang.
        </p>
        <p className="primary-text">
          Giai đoạn đầu, chủ đầu tư mở bán sản phẩm đặc biệt nhất của siêu dự án Vega City với 168 căn Shophouse, mang đến cho cư dân và khách hàng một không gian sống và làm việc độc quyền ngay sát bãi biển.
        </p>
        <div className="about-buttons-container">
          <button className="secondary-button">Tìm Hiểu Thêm</button>
          <button
            className="watch-video-button"
            onClick={() => setShowVideo(true)}
            aria-label="Watch Video"
          >
            <BsFillPlayCircleFill /> Xem Video
          </button>
        </div>
      </div>

      {showVideo && (
        <div className="video-container">
          <LazyLoad >
            <iframe
              width="1400px"
              height="700px"
              src="https://www.youtube.com/embed/snQaT-JaNYQ"
              title="Shophouse Vega City Nha Trang"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>

          </LazyLoad>
          <button
            className="close-button"
            onClick={() => setShowVideo(false)}
            aria-label="Close Video"
          >
            Đóng
          </button>
        </div>
      )}
    </section>
  );
};

export default About;
