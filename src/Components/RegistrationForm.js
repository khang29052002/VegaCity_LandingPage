import React, { useState } from 'react';

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

    const handleRecaptcha = async () => {
        return new Promise((resolve, reject) => {
            window.grecaptcha.enterprise.ready(async () => {
                try {  
                    const token = await window.grecaptcha.enterprise.execute('6Lch2UIqAAAAABAAZDSdWg-6MCG7RAATXiRrSlGz', { action: 'REGISTER' });
                    resolve(token);
                } catch (error) {
                    reject('Failed to get reCAPTCHA token');
                }
            });
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const recaptchaToken = await handleRecaptcha();
            setFormData(prevState => ({
                ...prevState,
                recaptcha: recaptchaToken
            }));
            console.log('reCAPTCHA Token:', recaptchaToken);

            // Xử lý dữ liệu biểu mẫu và gửi token
            console.log('Dữ liệu Form:', formData);
            alert('Đăng ký thành công!');
        } catch (error) {
            alert('Xác thực reCAPTCHA không thành công.');
        }
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
                <div className="form-group">
                    <button type="submit">Đăng Ký</button>
                </div>
            </form>
        </div>
    );
};

export default RegistrationForm;
