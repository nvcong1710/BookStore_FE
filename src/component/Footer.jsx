import React from 'react';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <a href="/">LOGO</a>
                </div>

                <div className="footer-nav">
                    <ul>
                        <li><a href="/">Trang Chủ</a></li>
                        <li><a href="/about">Giới Thiệu</a></li>
                        <li><a href="/register">Đăng Kí</a></li>
                        <li><a href="/contact">Liên Hệ</a></li>
                    </ul>
                </div>

                <div className="footer-info">
                    <h4>Thông Tin Liên Hệ</h4>
                    <p>Công ty ABC</p>
                    <p>Địa chỉ: 123 Đường ABC, TP. XYZ</p>
                    <p>Email: contact@yourcompany.com</p>
                    <p>Điện thoại: 0123 456 789</p>
                </div>

                <div className="footer-social">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                </div>

                <div className="footer-copyright">
                    <p>&copy; 2024 Your Company. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
