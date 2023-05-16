import "./style/home.css"
import axios from "axios";
import { useState } from "react";


function Detail() {
    const hashedGrades = {
        "0.1": "very poor",
        "0.2": "poor",
        "0.3": "averagely poor",
        "0.4": "fair",
        "0.5": "Averagely good",
        "0.6": "Good",
        "0.7": "Very Good",
        "0.8": "Wonderfully good",
        "0.9": "Excellently good",
        "1.0": "Super Exellently good",
    };

    const [formdata, setformdata] = useState({
        'UID': ''
    });

    const [data, setdata] = useState({
        'Student': '',
        'UID': '',
        'attendance': '',
        'externalmarks': '',
        'internalmarks': '',
        'grade': ''
    })

    const [found, setfound] = useState(false)

    const handlechange = (e) => {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        await axios.get("/details", {
            params: {
                UID: formdata.UID
            }
        })
            .then(function (response) {
                setdata(response.data);
                setfound(true)
            })
    }

    return (
        <div style={{ 'width': '80vh' }} className="container">
            <h1>Result</h1>
            {
                <form onSubmit={handlesubmit} >
                    <div >
                        <label for="UID">UID : </label>
                        <input type="String" name="UID" autoComplete="off" placeholder="UID" onChange={handlechange} />
                    </div>

                    <input type="submit" value="Submit" />
                </form>
            }
            {found && data.Student &&
                <div>
                    <h2>Student Name :{data.Student}</h2>
                    <h2>UID : {data.UID} </h2>
                    <h2>Attendance : {data.attendance}</h2>
                    <h2>External Marks : {data.externalmarks}</h2>
                    <h2>Internal Marks : {data.internalmarks}</h2>
                    <h2>Grade : {hashedGrades[String(data.grade)]}</h2>
                </div>
            }{
                found && !data.Student &&
                <div>
                    <h2>INVALID UID</h2>
                </div>
            }
        </div>
    )
}

export default Detail;
