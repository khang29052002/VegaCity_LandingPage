import React from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <section id="contact" className="contact-page-wrapper">
      <h1 className="primary-heading">Bạn Muốn Tham Gia Shophouse Cùng Chúng Tôi Không?</h1>
      <h1 className="primary-heading">Hãy Đăng Ký Ngay</h1>
      <Link to="/register" className="secondary-button">
        Đăng Ký
      </Link>
    </section>
  );
};

export default Contact;