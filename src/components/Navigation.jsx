import React, { useContext, useState } from 'react';
import { FaUser, FaSignInAlt, FaSignOutAlt, FaCog, FaChevronDown, FaBars } from 'react-icons/fa';
import AuthContext from './../context/AuthContext';

const Navigation = () => {
    const { token, user, logout } = useContext(AuthContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        alert('Đã đăng xuất');
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navigation">
            <div className="logo">
                <img src="./assets/avatar.png" alt="Car Express Logo" className="logo-img" />
                <span className="logo-text">CAR EXPRESS</span>
            </div>
            <div className="menu-toggle" onClick={toggleMenu}>
                <FaBars /> {/* Icon hamburger */}
            </div>
            <ul className={`menu ${menuOpen ? 'open' : ''}`}>
                <li>
                    <a href="/">
                        Trang Chủ
                    </a>
                </li>
                <li>
                    <a href="/introduce">
                        Tìm kiếm
                    </a>
                </li>
                <li>
                    <a href="/introduce">
                        Cho thuê xe
                    </a>
                </li>
                <li><a href="/blog">Bài viêt</a></li>
                {token ? (
                    <>
                        <li className="dropdown">
                            <button onClick={toggleDropdown}>
                                Tài Khoản <FaChevronDown />
                            </button>
                            {showDropdown && (
                                <ul className="dropdown-menu">
                                    <li><a href="/thong-tin-tai-khoan">{user?.username}</a></li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <a href="/settings">
                                <FaCog /> Cài Đặt
                            </a>
                        </li>
                        <li>
                            <button onClick={handleLogout} id='logout'>
                                <FaSignOutAlt /> Đăng Xuất
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <a href="/register" className="auth-register">
                                <FaUser /> Đăng Kí
                            </a>
                        </li>
                        <li>
                            <a href="/login" className="auth-login">
                                <FaSignInAlt /> Đăng Nhập
                            </a>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;