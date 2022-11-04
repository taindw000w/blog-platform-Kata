import { React, useState, useEffect} from 'react';
import { useSelector, useStore } from "react-redux";
import { Link } from "react-router-dom";
import vector from "../../images/Rectangle.png"

import "./autorize-header.scss";

export const AutorizeHeader = (props) => {
  const user = localStorage.getItem('user');
  const avatar = localStorage.getItem('image');


  let name = props.user;

  return (
    <div className="login-user">
      <Link to="/create-article" className="create-taskbutton">
        Create article
      </Link>
      <div className="wrapper-login-user">
        <Link to="/profile" className="link-profile">
          <div className="wrapper-login-user-avatar">
            <span className="login-username">{name}</span>
            <img
              className="login-username-avatar"
              src={avatar || "https://static.productionready.io/images/smiley-cyrus.jpg"}
              alt=""
            ></img>
          </div>
        </Link>
        <button className="log-out-btn" onClick={() => props.onChange()}>
          Log Out
        </button>
      </div>
    </div>
  );
}