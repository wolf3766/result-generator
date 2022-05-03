import { useState } from "react";
import axios from "axios";

function Signup(){
    const [formdata,setformdata]=useState({
        'Email':'',
        'Password':''
    })

    const handlechange =(e)=>{
        setformdata({
            ...formdata,
            [e.target.name]:e.target.value
        });
    };

    const handlesubmit= (e)=>{
        e.preventDefault();
        axios.post('http://localhost:8080/signup',{
            'Email':formdata.Email,
            'Password':formdata.Password
        })
        .then((Response)=>{
            window.location.assign('/addmarks');
        }, (error) =>{
            console.log(error);
        });
    }


    return(
        <div style={{'width': '80vh'}} className="container">
        <h1>Sign Up</h1>
    <form onSubmit={handlesubmit} >
    <div >
    <label for="Email">Email : </label>
    <input type="String" required name="Email" placeholder="Email" onChange={handlechange} />
    </div>
    <div>
    <label for="Password">Password : </label>
    <input type="String" required name="Password" placeholder="Password" onChange={handlechange} />
    </div>
    <input type="submit" value="Signup" />
  </form>
  </div>
    )
}



export default Signup;