import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    apiKey: "5f728deb-b2c3-4bac-9d9c-41a11e0acccc",
    name: "",
    phone: "",
    cccd: "",
    address: "",
    email: "",
    reason: "",
    terms: false,
    recaptcha: "",
  });

  const [errors, setErrors] = useState({});
  const emailRegex =
    /^(?!.*\.\.)(?!.*@\d+)(?!.*@[^.]*\.$)(?!.*@[^.]*-)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Tên không được để trống.";
    } else if (!nameRegex.test(formData.name) || !formData.name.includes(" ")) {
      newErrors.name =
        "Tên phải có khoảng trắng và không chứa ký tự lạ hoặc số.";
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone =
        "Số điện thoại phải có đúng 10 chữ số và không chứa ký tự lạ.";
    }
    if (!/^\d{12}$/.test(formData.cccd)) {
      newErrors.cccd = "CCCD phải gồm 12 chữ số và không chứa ký tự lạ.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Địa chỉ không được để trống.";
    }

    if (!formData.email) {
      newErrors.email = "Email không được để trống.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email không hợp lệ.";
    }

    if (!formData.terms) {
      newErrors.terms = "Bạn phải đồng ý với điều khoản.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRecaptcha = async () => {
    return new Promise((resolve, reject) => {
      window.grecaptcha.enterprise.ready(async () => {
        try {
          const token = await window.grecaptcha.enterprise.execute(
            "6Lch2UIqAAAAABAAZDSdWg-6MCG7RAATXiRrSlGz",
            { action: "REGISTER" }
          );
          resolve(token);
        } catch (error) {
          reject("Failed to get reCAPTCHA token");
        }
      });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return; // Stop submission if validation fails

    try {
      const recaptchaToken = await handleRecaptcha();
      setFormData((prevState) => ({
        ...prevState,
        recaptcha: recaptchaToken,
      }));

      const payload = {
        apiKey: "5f728deb-b2c3-4bac-9d9c-41a11e0acccc",
        fullName: formData.name,
        phoneNumber: formData.phone,
        cccd: formData.cccd,
        address: formData.address,
        email: formData.email,
        description: formData.reason,
        roleName: "Store",
      };

      const response = await axios.post(
        "https://api.vegacity.id.vn/api/v1/auth/sign-up/landing-page",
        payload
      );

      toast.success("Đăng ký thành công!", { position: "top-right" });
      console.log("API response:", response.data);
    } catch (error) {
      if (error.response) {
        const apiError =
          error.response.data?.messageResponse || "Đã có lỗi xảy ra.";

        toast.error(apiError, { position: "top-right" });

        console.error("API error response:", error.response);
      } else if (error.request) {
        toast.error("Không thể kết nối đến máy chủ.", {
          position: "top-right",
        });
        console.error("Request error:", error.request);
      } else {
        toast.error("Đã có lỗi xảy ra. Vui lòng thử lại.", {
          position: "top-right",
        });
        console.error("Unexpected error:", error.message);
      }
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
          {errors.name && <span className="error">{errors.name}</span>}
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
          {errors.phone && <span className="error">{errors.phone}</span>}
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
          {errors.cccd && <span className="error">{errors.cccd}</span>}
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
          {errors.address && <span className="error">{errors.address}</span>}
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
          {errors.email && <span className="error">{errors.email}</span>}
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
          <label htmlFor="terms">
            Tôi đồng ý với{" "}
            <a
              href="/terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-500 underline"
            >
              Các điều khoản và điều kiện
            </a>
          </label>
          {errors.terms && <span className="error">{errors.terms}</span>}
        </div>
        <div className="form-group">
          <button type="submit">Đăng Ký</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default RegistrationForm;
