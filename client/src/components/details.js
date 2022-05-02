import "./style/home.css"
import axios from "axios";
import { useState } from "react";


function Detail(){
    const [formdata,setformdata]=useState({
        'Name':'',
        'UID':''
    });

const [data,setdata]=useState({
    'Student': '',
    'UID': '',
    'DBMS' : '',
    'Computer_networks' : '',
    'web_dev':'',
    'operating_system':'',
    'DSA' : ''
})    

const [found,setfound]=useState(false)

    const handlechange =(e)=>{
        setformdata({
            ...formdata,
            [e.target.name]:e.target.value
        })
    }

    const handlesubmit = async (e)=>{
        e.preventDefault();
        await axios.get("http://localhost:8080/details",{
            params:{
                UID:formdata.UID
            }
        })
        .then(function(response){
            setformdata(response.data[0])
            setfound(true) 
        })
    }


    return (
        <div style={{'width': '80vh'}} className="container">
        <h1>Result</h1>
    {!found &&
    <form onSubmit={handlesubmit} >
    <div >
    <label for="UID">UID : </label>
    <input type="String" name="UID" placeholder="UID" onChange={handlechange} />
    </div>
    <div>
    <label for="NAME">Student Name : </label>
    <input type="String" name="Name" placeholder="NAME" onChange={handlechange} />
    </div>
    <input type="submit" value="Submit" />
  </form>
  }   
  {found &&
  <div>
        <h2>Student Name :{formdata.Student}</h2>
        <h2>UID : {formdata.UID} </h2>
        <h2>computer Networks : {formdata.Computer_networks}</h2>
        <h2>DSA : {formdata.DSA}</h2>
        <h2>DBMS : {formdata.DBMS}</h2>
        <h2>Web Development : {formdata.web_dev}</h2>
        <h2>Operating System : {formdata.operating_system}</h2>
        </div>
  } 


        </div>
    )
}

export default Detail;