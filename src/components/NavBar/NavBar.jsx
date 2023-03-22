import React, { useState, useEffect } from "react";
import "./NavBar.css";


const NavBar = () => {
  //tạo state để sử dụng hiệu ứng khi scroll đến 100px thì sẽ đổi nền thành màu đen
  //set chiều cao ban đầu khi chưa scroll là 0px
  const [navSize, setnavSize] = useState("0px");
  //set màu nền ban đầu khi chưa scroll là trong suốt
  const [navColor, setnavColor] = useState("transparent");
  //hàm xử lý sự kiện khi scroll
  const listenScrollEvent = () => {
    //nếu khi scroll xuống đến 100px thì màu nền sẽ chuyển sang đen, nếu chưa thì là trong suốt
    window.scrollY > 100 ? setnavColor("#000") : setnavColor("transparent");
    //nếu khi scroll xuống đến 100px thì chiều cao của navbar sẽ là 100px
    window.scrollY > 100 ? setnavSize("100px") : setnavSize("0px");
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  return (
    <div
      className="navbar"
      style={{
        backgroundColor: navColor,
        height: navSize,
        width: "100%",
        transition: "all 0.5s",
        position: "fixed",
        top: "0",
        alignItems: "top",
        display: "flex",
        justifyContent: "space-between",
        paddingTop: "5px",
        zIndex: "99"
      }}
    >
      <span className="logo" onClick={()=>window.location.replace('http://localhost:3000')}>Movie App</span>
      <span className="search" onClick={()=>window.location.replace('http://localhost:3000/search')}>
        <svg
          className="svg-inline--fa fa-search fa-w-16"
          fill="#ccc"
          aria-hidden="true"
          data-prefix="fas"
          data-icon="search"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          id="svg"
        >
          <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
        </svg>
      </span>
    </div>
  );
};

export default NavBar;
