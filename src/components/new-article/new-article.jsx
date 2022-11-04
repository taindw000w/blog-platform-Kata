import { React, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom'
import { createPost } from "../services/index";
import { createArticle } from "../../reducers/reducers"
import { updateArticle } from "../services/index";

import axios from "axios";

import './new-article.scss';

export const NewArticle = ({ match }) => {
  const slug = match ? match.params.slug : null;
  const [tagList, setTagList] = useState([]);
  const [post, setPost] = useState(false);
  const [valueInput, setValueInput] = useState("");
  const [statusArticles, setStatusArticles] = useState({});

  const dispatch = useDispatch();
  const {register, handleSubmit, formState:{ errors } } = useForm();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (slug) {
      axios
        .get(`https://blog.kata.academy/api/articles/${slug}`)
        .then((response) => {
          setStatusArticles(response.data.article);
          setTagList(response.data.article.tagList);
        })
        .catch((response) => {
          throw new Error("Статус ответа от сервера " + response.status);
        });
    }
  }, [slug])

  const create = async (articleData) => {
    try {
      const result = await createPost(token, {...articleData, tagList })
    } catch (error) {
      throw Error(error.message);
    }
    return true;
  }    
    
  const update = async (articleData) => {
    try {
      const result = await updateArticle(token, { article: { ...articleData, tagList } }, slug);
    } catch (err) {
      throw Error (err.message);
    }
    return true;
  }
  
  const onSubmit = async (data) => {
    let result;
    if (slug) {
      result = await update(data);
      setPost(result);
    } else {
      result = await create(data);
      dispatch(createArticle(data));
    }
    setPost(result);
  }

  const addTag = (e) => {
    e.preventDefault();
    setTagList([...tagList, valueInput]);
    setValueInput(' ')
  }

  const onDelete = (e, id) => {
    e.preventDefault();
    setTagList([...tagList.slice(0, id), ...tagList.slice(id + 1)])
  }
 
  if (post) {
    return <Redirect to={`/`} />;
  }

  const { title, description, body } = statusArticles;

  return (
    <div className="article-wrapper-box">
      {slug ? (
        <p className="article-creator-title">Edit article</p>
      ) : (
        <p className="article-creator-title">Create new article</p>
      )}
      <form className="article-creator-form" onSubmit={handleSubmit(onSubmit)}>
        <label className="label">
          <span className="article-creator-form__title">Title</span>
          <input
            type="text"
            className="article-creator-form__input"
            placeholder="Title"
            {...register("title", {
              required: true,
            })}
            defaultValue={(slug) ? title : null}
          />
        </label>
        <label className="label">
          <span className="article-creator-form__title">Short description</span>
          <input
            type="text"
            className="article-creator-form__input"
            placeholder="Title"
            {...register("description", {
              required: true,
            })}
            name="description"
            defaultValue={slug ? description : null}
          />
        </label>
        <label className="label">
          <span className="article-creator-form__title">Text</span>
          <textarea
            className="article-creator-form__textarea"
            rows="10"
            cols="30"
            type="text"
            placeholder="Text"
            {...register("body", {
              required: true,
            })}
            name="body"
            defaultValue={slug ? body : null}
          />
        </label>
        <label className="label-tags">
          <span className="article-creator-form__title">Tags</span>
          <div className="custom-wrapper">
            <input
              className="input-custom"
              value={valueInput}
              onChange={(e) => setValueInput(e.target.value)}
            />
            <button className="delete-btn">Delete</button>
            <button className="add-btn" onClick={(e) => addTag(e)}>
              Add
            </button>
          </div>

          <ul className="article-creator-form__wrapper-tags">
            {tagList.map((tag, index) =>
              <li className="item" key={index}>
                <input
                  className="article-creator-form__input-item"
                  value={tag}
                  onChange={(e) => setValueInput(e.target.value)}
                />
                <button
                  className="delete-btn"
                  onClick={(e) => onDelete(e, index)}
                >
                  Delete
                </button>
              </li>
            )}
          </ul>
        </label>
        <button className="button-send">Send</button>
      </form>
    </div>
  );
}