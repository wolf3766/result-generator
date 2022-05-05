import axios from "axios"
import "./style/addmarks.css"
import { useEffect } from "react"
import { useState } from "react"
import {logout} from "../firebase";

function Addmarks(){
    const [formdata,setformdata]=useState({
        'Student':'',
        'UID':'',
        'DBMS':"",
        'Computer_networks':"",
        'web_dev':"",
        'operating_system':"",
        'DSA':""
    });

const handlechange = (e)=>{
    setformdata({
        ...formdata,
        [e.target.name]: e.target.value
    });
}; 
    const handlesubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:8080/addmarks',{
            Student:formdata.Student,
            UID:formdata.UID,
            DBMS:formdata.DBMS,
            Computer_networks:formdata.Computer_networks,
            web_dev:formdata.web_dev,
            operating_system:formdata.operating_system,
            DSA:formdata.DSA
        }) 
        .then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });
          console.log(formdata);
          window.location.assign('/addmarks');
    };

    return(

         <div style={{'width': '80vh'}} className="container">
         <h1>Marks upload</h1>
        <form onSubmit={handlesubmit}>
            <label for="NAME">NAME</label>
            <input type="String" required name='Student' onChange={handlechange} />

            <label for="UID">UID</label>
            <input type="String" required name="UID" onChange={handlechange} />

            <label for="DBMS">DBMS </label>
            <input type="Number" required name='DBMS' onChange={handlechange} />

            <label for="computer_networks">Computer Networks</label>
            <input type="Number" required name='Computer_networks' onChange={handlechange} />
            
            <label for="web_dev">web Devlopment </label>
            <input type="Number" required name='web_dev' onChange={handlechange} />
           

            <label for="operating system">operating System </label>
            <input type="Number" required name='operating_system' onChange={handlechange} />

            <label for="DSA">DSA </label>
            <input type="Number" required name='DSA' onChange={handlechange} />
            <input type="submit" value="Submit" />
            
        </form>
        </div>
    )
}

export default Addmarks;