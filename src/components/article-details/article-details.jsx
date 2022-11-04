import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { Link, Redirect } from 'react-router-dom';
import { NewArticle } from "../new-article/new-article";
import { QuestionModal } from "../question-modal/question-modal";
import Pop from "../../images/arrow.png";
import { onEdited } from "../../reducers/reducers";
import { favoriteArticle } from "../services/index";
import { unfavoriteArticle } from "../services/index";
import './article-details.scss'
import axios from "axios";
import { updateArticle } from "../services/index"


export const ArticleDetails = (props) => {
  const [post, setPost] = useState();
  const [slug, setSlug] = useState(props.params.params.slug);
  const [questionDelete, setQuestionDelete] = useState(false)
  const [deleted, setDeleted] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'))

  const dispatch = useDispatch();
  useEffect(() => {
   axios
     .get(`https://blog.kata.academy/api/articles/${slug}`)
     .then((response) => {
       setPost(response.data);
     })
     .catch((response) => {
       throw new Error("Статус ответа от сервера " + response.status);
     });
  }, [slug]);

  const onEdit = () => {
    dispatch(onEdited(true));
  };

  const onQuestionDelete = () => {
    setQuestionDelete(true)
  }
  

  const buttonDelete = (post !== undefined && post.article.author.username === localStorage.getItem("username")) ? (<button className="button-delete" onClick={()=> onQuestionDelete()}>Delete</button>) : null;
  const buttonEdit =
    post !== undefined &&
    post.article.author.username === localStorage.getItem("username") ? (
      <Link to={`/article/${slug}/edit`}  className="button-edit" onClick={() => onEdit()}>
        Edit
      </Link>
    ) : null;
  
  if (deleted) {
    return <Redirect to="/"/>
  }


  let articlePrevDataItem = null;
  let articleResultDataItem =
    post !== undefined ? (
      <>
        <div className="article-wrapper">
          <div className="article-wrapper-title">
            <Link to={`/article/${slug}`} className="article-link">
              {post.article.title}
            </Link>
            <div className="article-vector-block">
              {post.article.favoritesCount > 0 ? (
                <button
                  className="article-vector-red"
                  type="button"
                ></button>
              ) : (
                <button
                  className="article-vector"
                  type="button"
                ></button>
              )}

              <span className="article-likes">
                {post.article.favoritesCount}
              </span>
            </div>
          </div>
          <div className="article-title-block ">
            {!post.article.tagList
              ? null
              : post.article.tagList.map((tag, index) => {
                  return (
                    <span key={index} className="article-tags">
                      {tag}
                    </span>
                  );
                })}
          </div>
          <span className="article-decription">{post.article.description}</span>
          <span className="article-text">
            <ReactMarkdown children={post.article.body} />
          </span>
        </div>
        <div className="article-wrapper-avatar">
          <div className="article-user">
            <img className="article-avatar" src={post.article.author.image} />
            <div>
              <p className="username">{post.article.author.username}</p>
              <span className="date">
                {format(new Date(post.article.createdAt), "MMMM, dd, yyyy")}
              </span>
            </div>
          </div>
          <div className="buttons">
            {buttonDelete}
            {questionDelete ? (
              <QuestionModal
                setDeleted={setDeleted}
                setQuestionDelete={setQuestionDelete}
                token={token}
                slug={slug}
                questionDelete={questionDelete}
              />
            ) : null}
            {buttonEdit}
          </div>
        </div>
      </>
    ) : (
      articlePrevDataItem
    ); 
  return (
    <div className="article-details">
      <article className="article-outer">
        {articlePrevDataItem}
        {articleResultDataItem}
      </article>
    </div>
  );
}