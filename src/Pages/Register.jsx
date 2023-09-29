import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import auth from "../firebase/firebase.config";
import { GoEye, GoEyeClosed } from "react-icons/go";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSucess] = useState("");
  const [isShow, setIsShow] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accpted = e.target.terms.checked; 
    console.log(name, email, password, accpted);
    setRegisterError("");
    setSucess("");

    if (password.length < 6) {
      setRegisterError("Password should be at least 6 characters or longer");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError(
        "Your Password should have at least one upper case chaeacters"
      );
      return;
    }
    else if(!accpted){
      setRegisterError('please Accpect out Trems And condition')
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSucess("User Created SuccessFully!!");

        updateProfile(result.user,{
          displayName: name, 
          photoURL: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg"
        })
        .then(() => {
          console.log('Profile Updated');
        })
        .catch()

        sendEmailVerification(result.user)
        .then(()=> {
          alert('Please Check your email and verify your account')
        })
      })
      .catch((error) => {
        console.error(error);
        setRegisterError(error.message);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200 ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h1 className="text-center text-3xl">Register</h1>
            <form onSubmit={handleRegister}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder=" Your Name"
                  name="name"
                  required
                  className="input input-bordered"
                />
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  name="email"
                  required
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="flex items-center relative ">
                  <input
                    type={isShow ? "text" : "password"}
                    placeholder="password"
                    name="password"
                    required
                    className="input input-bordered w-full"
                  />
                  <span className="absolute right-2" onClick={() => setIsShow(!isShow)}>
                    {" "}
                    {isShow ? <GoEye></GoEye> : <GoEyeClosed></GoEyeClosed>}
                  </span>
                </div>
              </div>
              <div>
                <input type="checkbox" name="terms" id="terms" />
                <label className="ml-2" htmlFor="terms">Accpect our trems and condition</label>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-secondary"
                  type="submit"
                  value="Register"
                />
              </div>
            </form>
            {registerError && <p className="text-red-600">{registerError}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <p>
              Please Login?
              <Link className="underline" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
