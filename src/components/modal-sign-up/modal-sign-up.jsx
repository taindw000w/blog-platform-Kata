import { React, useState } from 'react';
import { useDispatch} from 'react-redux';
import { FormField } from "../form-field/form-field";
import { FormFieldError } from "../form-field-error/form-field-error";
import { useForm } from 'react-hook-form';
import { addUser } from '../../reducers/reducers'
import { Link, Redirect } from 'react-router-dom';
import { online } from '../../reducers/reducers';

import styles from './modal-sign-up.module.scss';
import { signUp } from "../services/index";

export const SignUp = () => {
  const { register, handleSubmit, getValues, formState:{ errors } } = useForm();
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState(false);
  const [error, setError] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async user => {
    if (checked === true) {
      for (let key in user) {
        localStorage.setItem(`${key}`, user[key]);
      }
      setError(false);
      try {
        let result = await signUp(user)

        localStorage.setItem("token", result.user.token);

        setIsSignUp(!isSignUp)

        dispatch(online(true));
        dispatch(addUser(user));
        return result;
      } catch (result) {
        console.log(result);
      }

      localStorage.setItem('status', status)
    } else {
      setError(true)
    }
  }

  if (isSignUp) {
    return <Redirect to="/" />;
  }

  const USERNAME_MIN_LENGTH = 3;
  const USERNAME_MAX_LENGTH = 20;
  const PASSWORD_MIN_LENGTH = 6;
  const PASSWORD_MAX_LENGTH = 40;


  return (
    <section className={styles["modal"]}>
      <div className={styles["modal-wrapper-sign-up"]}>
        <h2 className={styles["modal-title"]}>Create new account</h2>
        <form id={styles["form"]} onSubmit={handleSubmit(onSubmit)}>
          <FormField
            label="Username"
            placeholder="Username"
            register={register("username", {
              required: true,
              minLength: USERNAME_MIN_LENGTH,
              maxLength: USERNAME_MAX_LENGTH,
            })}
            name="username"
            error={errors.username}
          />
          {errors.username && errors.username.type === "required" && (
            <FormFieldError error="This field is required!" />
          )}
          {errors.username && errors.username.type === "minLength" && (
            <FormFieldError
              error={`Your username needs to be at least ${USERNAME_MIN_LENGTH} characters!`}
            />
          )}
          {errors.username && errors.username.type === "maxLength" && (
            <FormFieldError
              error={`Your username needs to be not more than ${USERNAME_MAX_LENGTH} characters!`}
            />
          )}

          <FormField
            name="email"
            type="email"
            label="Email address"
            placeholder="Email address"
            register={register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
            error={errors.email}
          />

          {error && errors.email?.type === "required" && (
            <FormFieldError error="Email is required." />
          )}
          {error && errors.email?.type === "pattern" && (
            <FormFieldError error="Email is not valid." />
          )}

          <FormField
            type="password"
            label="Password"
            placeholder="Password"
            register={register("password", {
              required: true,
              minLength: PASSWORD_MIN_LENGTH,
              maxLength: PASSWORD_MAX_LENGTH,
            })}
            name="password"
            error={errors.password}
          />
          {errors.password && errors.password.type === "required" && (
            <FormFieldError error="This field is required!" />
          )}
          {errors.password && errors.password.type === "minLength" && (
            <FormFieldError
              error={`Your password needs to be at least ${PASSWORD_MIN_LENGTH} characters!`}
            />
          )}
          {errors.password && errors.password.type === "maxLength" && (
            <FormFieldError
              error={`Your password needs to be not more than ${PASSWORD_MAX_LENGTH} characters!`}
            />
          )}
          <FormField
            type="password"
            label="Repeat Password"
            placeholder="Password"
            register={register("repeat-password", {
              required: true,
              validate: (value) => value === getValues("password"),
            })}
            name="repeat-password"
            error={errors["repeat-password"]}
          />
          {errors["repeat-password"] &&
            errors["repeat-password"].type === "required" && (
              <FormFieldError error="This field is required!" />
            )}
          {errors["repeat-password"] &&
            errors["repeat-password"].type === "validate" && (
              <FormFieldError error="Passwords must match!" />
            )}
          <label className={styles["label-checkbox-sign-up__autentify"]}>
            <input
              type="checkbox"
              className={styles["custom-checkbox"]}
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
            <span className={styles["checkbox-new"]}></span>
            <span className={error ? styles["error"] : styles["checkbox-text"]}>
              I agree to the processing of my personal information
            </span>
          </label>
          <button className={styles["button-create-user"]}>Create</button>
        </form>
        <span className={styles["info-title"]}>
          Already have an account? <Link to="/sign-in">Sign In.</Link>
        </span>
      </div>
    </section>
  ); 
}
