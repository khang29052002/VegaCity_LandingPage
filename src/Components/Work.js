import React, { useState } from "react";
import CARIBBEAN from "../Assets/carribean.png";
import EUROPE from "../Assets/eu.png";
import HAWAII from "../Assets/hawaii.png";
import POLYNESIA from "../Assets/poly.png";

const Work = () => {
  const [activeCard, setActiveCard] = useState(null);

  const workInfoData = [
    {
      image: CARIBBEAN,
      title: "CARIBBEAN",
      text: "Thiên đường miền nhiệt đới",
    },
    {
      image: EUROPE,
      title: "EUROPE",
      text: "Đại lộ ánh sáng",
    },
    {
      image: HAWAII,
      title: "HAWAII",
      text: "Vùng đất của văn hoá, ẩm thực và nghệ thuật",
    },
    {
      image: POLYNESIA,
      title: "POLYNESIA",
      text: "Nightlife nơi hội hè bất tận",
    },
  ];

  const handleCardClick = (index) => {
    setActiveCard(activeCard === index ? null : index);
  };

  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Shophouse</p>
        <h1 className="primary-heading">Shophouse Vega City</h1>
        <p className="primary-text">
          Nhà mẫu dự án Vega City được xây dựng ngay tại dự án nên quý khách
          hàng có thể trải nghiệm thực tế các ngày trong tuần. Quý khách hàng
          tham quan thiết kế mẫu dự án sẽ có cơ hội trải nghiệm thực tế tại khu
          sống Shophouse giai đoạn 1 dự án Vega City đã và đang ngày một hoàn
          thiện và chuẩn bị đưa vào hoạt động qua đó thấu hiểu được chất lượng
          và dịch vụ mà chủ đầu tư mong muốn mang lại cho quý khách hàng.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data, index) => (
          <div
            className={`work-section-info ${activeCard === index ? 'show-text' : ''}`}
            key={data.title}
            onClick={() => handleCardClick(index)}
          >
            <div className="info-boxes-img-container">
              <img src={data.image} alt={data.title} />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
