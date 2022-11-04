import { React, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { online } from "../reducers/reducers";
import { AutorizeHeader } from '../autorize-header/autorize-header';

import './header.scss';

export const Header = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [profileStatus, setProfileStatus] = useState(false);
  const [createArticleStatus, setCreateArticleStatus] = useState(false);

  const onlineState = useSelector((state) => state.booleanLogin);
  const dispatch = useDispatch();
 
  const user = localStorage.getItem('username');

  useEffect(() => {
    if (user !== null) {
      setIsSignUp(!isSignUp);
    } 
  }, [user, setIsSignUp]);

  console.log(isSignUp)

  const onChangeBack = () => {
    localStorage.clear();
    localStorage.setItem('status', false)
    dispatch(online(false));
    setIsSignUp(!isSignUp);
  };
  
  const customHeader = (
    <div className="autorize">
      <Link to="/sign-in" className="autorize-sign-in">
        Sign In
      </Link>
      <Link to="/sign-up" className="autorize-sign-up">
        Sign Up
      </Link>
    </div>
  );
  
  const autorizeHeader = <AutorizeHeader onChange={onChangeBack} user={user} />;


  return (
    <header className="header">
      <div className="wrapper-header">
        <Link to="/" className="title">
          Realworld Blog
        </Link>
        {!isSignUp && customHeader}
        {isSignUp && autorizeHeader}
      </div>
    </header>
  );
}
