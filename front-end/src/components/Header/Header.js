import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export const Header = ({ isLogin, setIsLogin, userInfo }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLogin(false);
    navigate("/");
  };

  return (
    <header>
      <div className="header-container">
        <div className="marquee">
          <p>{isLogin ? `Welcome , ${userInfo}` : "User - Registration"}</p>
        </div>
        {isLogin && (
          <button className="logout-button" onClick={() => handleLogout()}>
            logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
