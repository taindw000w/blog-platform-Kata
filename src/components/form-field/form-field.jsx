import {React} from "react";

import "./form-field.scss"


export const FormField = ({
  label,
  placeholder,
  register,
  name,
  defaultValue,
  error,
  onChange,
  type = "text",
}) => {
  return (
    <label className="label">
      {label}
      <input
        placeholder={placeholder}
        type={type}
        className={`field ${error ? "field--wrong" : "field--correct"}`}
        {...register}
        onChange={onChange}
        name={name}
        defaultValue={defaultValue}
      />
    </label>
  );
}


