import {React, useState} from "react"; 
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { FormField} from "../form-field/form-field";
import { FormFieldError } from "../form-field-error/form-field-error"
import { Link, Redirect } from "react-router-dom";
import { signIn, authorizeUser } from '../services/index'
import { online } from '../../reducers/reducers';
import { addUser } from "../../reducers/reducers";

import "./modal-sign-in.scss";

export const SignIn = () => {
  const { register, handleSubmit, getValues, watch, formState:{ errors } } = useForm();
  const [isSignIn, setIsSignIn] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  
  const onSubmit = async (user) => {
    try {
      const response = signIn(user)
      const resultInfoUser = await response;
      if (resultInfoUser.errors) {
        if (resultInfoUser.errors["email or password"]) {
          setError(`email or password ${resultInfoUser.errors["email or password"]}`);
        }
      } 
      const token = resultInfoUser.user.token;
      const responseAuthorizate = await authorizeUser(token);

      setIsSignIn(!isSignIn);
      dispatch(addUser(responseAuthorizate));

      for (let key in resultInfoUser.user) {
        localStorage.setItem(`${key}`, resultInfoUser.user[key]);
      }
      dispatch(online(true));
      localStorage.setItem('status', true)
    } catch (err) {
      setError("email or password is invalid")
    }
  }

  if (isSignIn === true) {
    return <Redirect to="/" />;
  }

  return (
    <section className="modal">
      <div className="modal-wrapper-sign-in">
        <h3 className="modal-title-sign-in">Sign In</h3>
        <form className="form-sign-in" onSubmit={handleSubmit(onSubmit)}>
          <FormField
            name="email"
            type="email"
            label="Email address"
            placeholder="Email address"
            register={register("email", { required: true })}
            error={errors.email || error}
          />
          {error && errors.email?.type === "required" && (
            <FormFieldError error="This field is required!" />
          )}

          {error && <FormFieldError error={error} />}

          <FormField
            type="password"
            name="password"
            label="Password"
            placeholder="Password"
            register={register("password", { required: true })}
            error={errors.password || error}
          />
          {errors.password?.type === "required" ? (
            <span className="error">{"Password is required."}</span>
          ) : null}
          {errors.password?.type === "minLength" && (
            <FormFieldError error="Your password needs to be at least 6 characters." />
          )}
          {errors.password?.type === "maxLength" && (
            <span className="error">
              {"Must contain no more than 20 characters."}
            </span>
          )}
          {error && <FormFieldError error={error} />}
          <button className="button-login">Login</button>
        </form>
        <span className="info-title">
          Don’t have an account? <Link to="/sign-up"> Sign Up.</Link>
        </span>
      </div>
    </section>
  );
};
