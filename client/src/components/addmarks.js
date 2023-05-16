import axios from "axios"
import "./style/addmarks.css"
import { auth } from "../firebase"
import { useState, nav } from "react"

function Addmarks() {
    const [formdata, setformdata] = useState({
        Student: '',
        UID: '',
        attendance: 0,
        externalmarks: 0,
        internalmarks: 0
    });

    var user = auth.currentUser;

    const handlechange = (e) => {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value
        });
    };
    const handlesubmit = (e) => {
        e.preventDefault();
        axios.post('/addmarks', {
            Student: formdata.Student,
            UID: formdata.UID,
            attendance: formdata.attendance,
            externalmarks: formdata.externalmarks,
            internalmarks: formdata.internalmarks
        })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
        alert("Marks Added for Student Evaluation")
        nav("/dashboard")

    };
    if (user) {
        return (
            <div style={{ 'width': '80vh' }} className="container">

                <h1>Marks upload</h1>
                <form onSubmit={handlesubmit}>
                    <label for="NAME">NAME</label>
                    <input type="String" required name='Student' onChange={handlechange} />

                    <label for="UID">UID</label>
                    <input type="String" required name="UID" placeholder="Example 20BCS9960" onChange={handlechange} />

                    <label for="ATTENDANCE">Attendance</label>
                    <input type="Number" required name="attendance" placeholder="Out of 10" max={10} onChange={handlechange} />

                    <label for="EXTERNALMARKS">External Marks</label>
                    <input type="Number" required name="externalmarks" placeholder="Out of 50" max={50} onChange={handlechange} />

                    <label for="INTERNALMARKS">Internal Marks</label>
                    <input type="Number" required name="internalmarks" placeholder="Out of 40" max={40} onChange={handlechange} />

                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    } else {
        return (
            alert("do login please !")
        )
    }
}

export default Addmarks;