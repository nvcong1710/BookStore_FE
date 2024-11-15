import React, { useContext, useState } from 'react';
import { FaHome, FaUser, FaSignInAlt, FaSignOutAlt, FaCog, FaInfoCircle, FaChevronDown, FaBars, FaShareSquare } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';

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
                <a href="/">LOGO</a>
            </div>
            <div className="menu-toggle" onClick={toggleMenu}>
                <FaBars /> {/* Icon hamburger */}
            </div>
            <ul className={`menu ${menuOpen ? 'open' : ''}`}>
                <li>
                    <a href="/">
                        <FaHome /> Trang Chủ
                    </a>
                </li>
                <li>
                    <a href="/introduce">
                        <FaInfoCircle /> Giới Thiệu
                    </a>
                </li>
                <li><a href="/blog"><FaShareSquare /> Blog</a></li>
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
                        <li><a href="/register"><FaUser /> Đăng Kí</a></li>
                        <li><a href="/login"><FaSignInAlt /> Đăng Nhập</a></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;


