import { React } from 'react';
import "./form-field-error.scss"

export const FormFieldError = ({ error }) => {
  return <p className="form-field-error">{error}</p>;
};
