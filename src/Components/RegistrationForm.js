import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        cccd: '',
        address: '',
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
        console.log('reCAPTCHA Token:', value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.recaptcha) {
            alert('Vui lòng hoàn tất reCAPTCHA');
            return;
        }

        fetch('https://recaptchaenterprise.googleapis.com/v1/projects/vega-city-1725356695744/assessments?key=6Lft6DQqAAAAABrLgRQGTYDQSPgiM8yBSIAvvL4k', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                event: {
                    token: formData.recaptcha,
                    siteKey: '6Lft6DQqAAAAABrLgRQGTYDQSPgiM8yBSIAvvL4k',
                    expectedAction: 'REGISTER'
                }
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Kết quả xác thực reCAPTCHA:', data);

            if (data.tokenProperties.valid) {
                console.log('Dữ liệu Form:', formData);
                alert('Đăng ký thành công!');
            } else {
                alert('Xác thực reCAPTCHA không hợp lệ.');
            }
        })
        .catch(error => {
            console.error('Lỗi:', error);
            alert('Có lỗi xảy ra khi xác thực reCAPTCHA.');
        });
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
                        sitekey="6Lft6DQqAAAAABrLgRQGTYDQSPgiM8yBSIAvvL4k"
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
