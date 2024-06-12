import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
// import PNavbar from "../components/navbar.jsx";
import "./signup.css";


const User = () => {
    
    const navigate = useNavigate();
    const [user, setUser] = useState({nickname: '' , username: '', password: ''});
    const {nickname, username, password} = user;

    const handleChange = (e) => {
        setUser({...user, [e.target.name] : e.target.value});
    }

    const handleSubmit = async (e) => {
         e.preventDefault();
        const res = await fetch("http://localhost:5000/register",{
                method : "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body : JSON.stringify({
                    nickname, username, password
                })
 
        });

        try{

            const data = await res.json();
            window.alert(data.message);
            console.log(data.message)
            navigate('/login');
         
        }catch(err){
            window.alert(err);
                console.log(err);
        }
        
    }

    const gotologin =()=>{
        navigate('/login');
    }
    return (
      <>
      {/* <PNavbar />    */}
        <div className="signup_main">
      <div className="wrapper">
        <form action="">
          <h1>Signup</h1>

          <div className="input-box">
            <input
              name='nickname' value={nickname} onChange={handleChange}
              type="text"
              placeholder="Enter your Name?"
              required
            />
            <i className="bx bxs-lock-alt"></i>
          </div>

          <div className="input-box">
            <input
              name='username' value={username} onChange={handleChange}
              type="text"
              placeholder="Username"
              required
            />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input
              name='password' value={password} onChange={handleChange}
              type="password"
              placeholder="Create New Password"
              required
            />
            <i className="bx bxs-lock-alt"></i>
          </div>

          <div className="remember-forgot">
          </div>
          <button type='submit' onClick={handleSubmit} className="btn">
            Register
          </button>
          <div className="register-link">
            <p>
              Already have an account? <a href="#" onClick={gotologin}>Login</a>
            </p>
          </div>
        </form>
      </div>
      </div>
      </>
    );
}

export default User