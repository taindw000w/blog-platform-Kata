import { React, useState, useEffect } from 'react';
import "./tags-form.scss"

export const TagsForm = ({ tag, id, addTag, onChange, setTagList, tagList, last, value }) => {
  console.log(tag);
  return (
    <li className="item" key={id}>
      <input
        className="article-creator-form__input-item"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button className="delete-btn">Delete</button>
      {id === 0 ? (
        <button className="add-btn" onClick={addTag}>
          Add
        </button>
      ) : null}
    </li>
  );
};