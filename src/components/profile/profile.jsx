import { React } from 'react';
import { useDispatch} from 'react-redux';
import { useForm } from 'react-hook-form';
import { updateUser } from "../services/index";
import { editeUser } from "../../reducers/reducers";
import './profile.scss';

export const Profile = () => {
  const { register, handleSubmit, formState:{ errors } } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (userData) => {
    const { password, image, username, email } = userData;
    const userNew = {
      image,
      username,
      email,
    };

    if (password !== "") {
      userNew.password = password;
    }

    dispatch(editeUser(userNew));

    const result = await updateUser(userNew);
    const newUser = await result;

    for (let key in newUser.user) {
      localStorage.setItem(`${key}`, newUser.user[key]);
    }
    window.location.reload()
    
  };
  
  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <p className="profile-title">Edit Profile</p>
        <form className="form-user" onSubmit={handleSubmit(onSubmit)}>
          <span className="username">Username</span>
          <input
            type="text"
            {...register("username")}
            className="form-user__user"
            defaultValue={localStorage.getItem("username")}
          />
          <span className="username">Email address</span>
          <input
            type="email"
            {...register("email")}
            className="form-user__email"
            defaultValue={localStorage.getItem("email")}
          />
          <span className="username">New password</span>
          <input
            type="text"
            {...register("password")}
            className="form-user__password"
          />
          <span className="username">Avatar image (url)</span>
          <input
            type="text"
            {...register("image")}
            className="form-user__avatar"
          />
          <button className="save-btn">Save</button>
        </form>
      </div>
    </div>
  );
}