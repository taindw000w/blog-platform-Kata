import { React} from 'react';
import "./question-modal.scss"
import Pop from "../../images/arrow.png"
import Vector from "../../images/Vector-point.svg";

import { deleteArticle } from "../services/index"

export const QuestionModal = ({setQuestionDelete, setDeleted, slug, token}) => {

  const onDeletePost = async (token, slug) => {
    try {
      const result = await deleteArticle(token, slug);
      setDeleted(true)
    } catch (err) {
      throw new Error("Error deleting article " + err.message);
    }
  }

  return (
    <div className="question-delete">
      <img src={Pop} className="arrow-delete-modal" alt="" />
      <div className="modal-question">
        <img src={Vector} className="point" alt="" />
        <div className="buttons-questions">
          <p>Are you sure to delete this article?</p>
          <div className="btns">
            <button className="no-btn" onClick={() => setQuestionDelete(false)}>
              No
            </button>
            <button
              className="yes-btn"
              onClick={() => onDeletePost(token, slug)}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}