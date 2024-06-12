import React, {useState , useEffect}  from "react";
import { NavLink } from "react-router-dom";
import "./CSS/navbar.css";


function Navbar(props) {


  const [logged_user_data,chng] = useState({});
  const [flag,Cod] = useState(false);

  const fetchuser = async ()=> {
    try {
      const userdata = await fetch('http://localhost:5000/usercokkie',{
        method: "GET",
        headers: {
          Accept:"application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      
       const data = await userdata.json(); 
      //  if we didnt get the data so the function is goto catch(err) and eroro will be shown iske neehce ka console bhi print nhi hoga
       Cod(true);
       chng(data);
    console.log( "data came -" + data.username);
    } catch (err) {
      Cod(false);
      console.log(data + " user login nhi hai");
    }

 }

  useEffect( () => {
    console.log("fetchuser");
    fetchuser();
},[])



  const [dark,changetheme] = useState(false);

// we cannot initialize directly things this way as it rerenders and stuck in infinite loop
    // if(flag==true){
    //   dispImgChange("dispBlock");
    //   dispBtnChange("disNone");
    //   console.log(logged_user_data.user);
    // }
    // else {
    //   dispImgChange("disNone");
    //   dispBtnChange("dispBlock");
    //   console.log("props done");
    // }


  



window.addEventListener('scroll', ()=>{
    console.log(window.scrollY);
    if(window.scrollY>=80){
      changetheme(true);
    }else{
      changetheme(false);
    }
  });


    return (
      <>  
        {/* <nav  className={`navbar navbar-expand-sm navbar-dark fixed-top ${dark} `} > */}
        <nav  className={dark?"navbar navbar-expand-sm navbar-dark fixed-top navbar_scrolled":"navbar navbar-expand-sm navbar-dark fixed-top"}  >
    <div className="container-fluid">
      <NavLink className="navbar-brand" to="/">StegoFrog</NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/signup">signup</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/stagt">stag1</NavLink>
          </li>
          <li className="nav-item ">
            <NavLink className="nav-link" to="/stagp">stag2</NavLink>
          </li>
          <li className="nav-item dis">
          {flag === true && (
              <img className="profile_icon grow" src="../assets/profile_icon.jpg" alt="Avatar" />
          )}
          {flag === false && (
              <button className="btn btn-danger login_btn"  type="button" >Login</button>
          )}
          </li>
        </ul>
      </div>
    </div>
  </nav>
      </>
    );
  }
  
  
  export default Navbar;