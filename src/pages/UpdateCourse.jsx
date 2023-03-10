import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../component/Navbar";
import "../style/Coursepage.css";
import "../style/AddCourse.css";

const UpdateCorse = ()=>{

    const navigate = useNavigate();
    const {id} = useParams();
    const [course, setCourse] = useState(null);

    const fetchGetId = async (id) => {
        return fetch("http://localhost:8080/api/course/find/" + id);
    };

    useEffect(()=>{
        fetchGetId(id).then((res)=>{
            return res.json()
        }).then((data)=>{
            if (data){
                console.log(data);
                setCourse(data);
            }
        });
    },[id]);

    function change(element){
        const {name, value} = element.target;
        setCourse({...course,[name]:value})
    }
    

    async function fetchPut(course){

        const response = await fetch(
          "http://localhost:8080/api/course/update/" + course.id,
          {
            method: "PUT",
            body: JSON.stringify(course),
            headers: {
              "Content-Type": "application/json"},
          }
        );
        if(!response.ok){
            console.error("request failed");
        }else{
            navigate("/");
        }
    }

    function submitHandler(e) {
        e.preventDefault();
        fetchPut(course);
    }
    if(course === null){
        return <h3 className="text-danger">*** contact noy found ***</h3>;
    }
    return (
      <>
        <Navbar />
        <div className="contTitle container">
          <h1 className="title text-center">Muscle Gest</h1>
          <img
            src="../image/Logo.png"
            className="imgclass rounded-circle border border-primary border-opacity-50"
            alt="logo"
          />
          <h2 className="text-center">Course Update</h2>
          <div className="boxTable row">
            <div className="col-sm-1 col-md-5 container justify-content-center">
              <div className="">
                <form onSubmit={submitHandler} className="row g-3">
                  <div>
                    <label htmlFor="name" className="form-label">
                      Nome Corso
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={course.name}
                      onChange={change}
                    />
                  </div>
                  <div className="box-footer">
                    <button type="submit" className="save mt-2">
                      UPDATE
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
export default UpdateCorse;