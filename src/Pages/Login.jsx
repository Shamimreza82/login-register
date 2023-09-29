import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import auth from "../firebase/firebase.config";
import { useRef, useState } from "react";


const Login = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSucess] = useState("");
  const emailRef = useRef(null)


 
  const handleLogin = e => {
    e.preventDefault()
    const email = e.target.email.value; 
    const password = e.target.password.value; 
    console.log(email, password)
    setRegisterError("")
    setSucess("")

    signInWithEmailAndPassword(auth, email, password)
    .then(result => {
      console.log(result.user);
      
      if(result.user.emailVerified){
        setSucess("Login SuccessFull!!")
      } else {
        alert('please varify your email address')
      }
     
    })
    .catch(error => {
      setRegisterError(error.message)
    })
  }


  const handleForgetPassword = () => {
    const email = emailRef.current.value; 
    if(!email){
      alert("please Provide email")
      return; 
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
      console.log("Please Write a valid email");
      return; 
    }


    sendPasswordResetEmail(auth, email)
    .then(result => {
      alert("please Check your Email");
    })
    .catch(error => {
      console.error(error);
    })
   
  }
    

  return (
    <div className="hero min-h-screen bg-base-200 ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h1 className="text-center text-3xl">Login</h1>
            <form onSubmit={handleLogin}  >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  ref={emailRef} 
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="text"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            {
              registerError && <p className="text-red-600">{registerError}</p>
            }
            {
              success && <p className="text-green-600">{success}</p>
            }
            
            <p>
              Please Login?{" "}
              <Link className="underline" to="/register">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
