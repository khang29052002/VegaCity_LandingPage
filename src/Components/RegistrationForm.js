// src/components/RegistrationForm.js
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        cccd: '',
        address: '',
        store: '',
        email: '',
        reason: '',
        terms: false,
        recaptcha: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleRecaptcha = (value) => {
        setFormData(prevState => ({
            ...prevState,
            recaptcha: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="container">
            <h1>Đăng Ký</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Tên:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Số điện thoại:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cccd">CCCD:</label>
                    <input
                        type="text"
                        id="cccd"
                        name="cccd"
                        value={formData.cccd}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Địa chỉ:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="reason">Lý do đăng ký (tùy chọn):</label>
                    <textarea
                        id="reason"
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="form-group-1">
                    <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        checked={formData.terms}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="terms">Tôi đồng ý với các điều khoản và điều kiện</label>
                </div>
                <div className="form-group-2">
                    <ReCAPTCHA
                        sitekey="6LcLayoqAAAAAN9ZpCqX0IQ6T8sv4SyU6cLX2ssi"
                        onChange={handleRecaptcha}
                    />
                </div>
                <div className="form-group">
                    <button type="submit">Đăng Ký</button>
                </div>
            </form>
        </div>
    );
};

export default RegistrationForm;
