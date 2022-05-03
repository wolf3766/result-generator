import { useState } from "react";
import axios from "axios";

function Login(){
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
        axios.get('http://localhost:8080/login',{
            params:{
                Email: formdata.Email,
                Password:formdata.Password
            }
        }) 
        .then((response)=>{
            if(response.length !==0){
                window.location.assign('/addmarks');
            }
        },(error)=>{
            console.log(error);
        });
    }

    return(
        <div style={{'width': '80vh'}} className="container">
        <h1>Login</h1>
    <form onSubmit={handlesubmit} >
    <div >
    <label for="Email">Email : </label>
    <input type="String" required name="Email" placeholder="Email" onChange={handlechange} />
    </div>
    <div>
    <label for="Password">Password : </label>
    <input type="String" required name="Password" placeholder="Password" onChange={handlechange} />
    </div>
    <input type="submit" value="Submit" />
  </form>
  </div>
    )
}

export default Login;