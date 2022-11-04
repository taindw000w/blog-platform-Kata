import {React, useState} from 'react';
import { favoriteArticle } from '../services/index';
import { unfavoriteArticle } from '../services/index';
import { Link } from 'react-router-dom';
import { format } from "date-fns";
import './article.scss';

export const Article = (props) => {
  const { body, date, description, favorited, favoritesCount, slug, title, tagList } = props;
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [resultFavorited, setResultFavorited] = useState(favorited);
  const [counter, setCounter] = useState(favoritesCount)
  const [user, setUser] = useState(localStorage.getItem("username"));
  
  let bodyUpdate = body.length > 100 ? body.slice(0, 100) + '...' : body;
  let titleUpdate = title.length > 30 ? title.slice(0, 30) + '...' : title;
  let descriptionUpdate = description.length > 40 ? description.slice(0, 40) + '...' : description;

  const toogleLike = async (resultFavoritedBollean, token, slug) => {
    if (!resultFavoritedBollean) {
      const responseFavorited = await favoriteArticle(token, slug);
      setResultFavorited(responseFavorited.article.favorited);
      setCounter(responseFavorited.article.favoritesCount);
    } else {
      const responseUnfavorited = await unfavoriteArticle(token, slug);
      setResultFavorited(responseUnfavorited.article.favorited);
      setCounter(responseUnfavorited.article.favoritesCount);
    }
  };
  
    return (
      <li className="article-item">
        <article className="article-outer">
          <div className="article-wrapper">
            <div className="article-wrapper-title">
              <Link to={`/article/${slug}`} className="article-link">
                {titleUpdate}
              </Link>
              <div className="article-vector-block">
                {user === null ? (
                  <button className="article-vector" />
                ) : (
                  <span>
                    {resultFavorited ? (
                      <button
                        className="article-vector-red"
                        onClick={() => toogleLike(resultFavorited, token, slug)}
                        type="button"
                      ></button>
                    ) : (
                      <button
                        className="article-vector"
                        onClick={() => toogleLike(resultFavorited, token, slug)}
                        type="button"
                      ></button>
                    )}
                  </span>
                )}

                <span className="article-likes">{counter}</span>
              </div>
            </div>
            <div className="article-title-block ">
              {!tagList
                ? null
                : tagList.map((tag, index) => {
                    return (
                      <span key={index} className="article-tags">
                        {tag}
                      </span>
                    );
                  })}
            </div>
            <span className="article-decription">{descriptionUpdate}</span>
            <span className="article-text">{bodyUpdate}</span>
          </div>
          <div className="article-wrapper-avatar">
            <div className="article-user">
              <img className="article-avatar" src={props.author.image} />
              <div>
                <p className="username">{props.author.username}</p>
                <span className="date">
                  {format(new Date(props.date), "MMMM, dd, yyyy")}
                </span>
              </div>
            </div>
          </div>
        </article>
      </li>
    );
   
}
  
 
