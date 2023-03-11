import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../component/Navbar";

const UpdateActivityWeek = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const [activity, setActivity] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState([]);
    const [courses, setCourses] = useState([]);

    async function fetchGetAllCourses(){
      try{
        const response = await fetch(
          "http://localhost:8080/api/course/all"
        );

        const data = await response.json();

        const trasformCourse = data.map((c)=>{
          return {id: c.id, name: c.name}
        });
        
        setCourses(trasformCourse);
      }catch(error){
        throw new Error("request filed");
      }
    };

    useEffect(() => {
      fetchGetAllCourses();
    },[]);

    const fetchGetId = async (id) => {
      return fetch("http://localhost:8080/api/dayWeek/find/" + id);
    };

    useEffect(()=>{
      fetchGetId(id).then((res)=>{
        return res.json();
      }).then((data)=>{
        if(data){
          console.log(data);
          setActivity(data);
        }
      });
    },[id]);

    function changeDay(element){
      const {name, value} = element.target;
      setActivity({...activity,[name]:value});
    }

    function changeCurrentDay(element){
      const{name, value} = element.target;
      setActivity({...activity,[name]:value});
    }

    async function fetchPut(act){
      const response = await fetch(
        "http://localhost:8080/api/dayWeek/update/" + act.id,
        {
          method:"PUT",
          body:JSON.stringify(act),
          headers: { "Content-Type":"application/json" },
        }
      );

      if(!response.ok){
        console.error("request filed")
      }else{
        navigate("/")
      }
    };

    function submitHandler(e){
      e.preventDefault();
      fetchPut(activity);
      console.log(activity);
    }
    if(activity === null){
      return (
        <h3 className="text-danger">*** activity not found ***</h3>
      );
    }
  return (
    <>
      <Navbar />
      <div className="contTitle container">
        <h1 className="title text-center">Muscle Gest</h1>
        <img
          src="../image/Logo.png"
          className="imgclass rounded-circle border border-primary border-opacity-50"
          alt="new course"
        />
        <h2 className="text-center">Activity Week Update</h2>
        <div className="boxTable row">
          <div className="col-sm-1 col-md-5 container justify-content-center">
            <div className="container">
              <form onSubmit={submitHandler} className="row g-3">
                <div>
                  <label htmlFor="inputPT" className="form-label">
                    Day
                  </label>
                  <input
                    type="text"
                    placeholder="insert day"
                    name="day"
                    value={activity.day}
                    onChange={changeDay}
                  />
                </div>
                <div>
                  <label htmlFor="inputPT" className="form-label">
                    Local Date
                  </label>
                  <input
                    type="date"
                    placeholder="yyyy-MM-dd"
                    name="currentDay"
                    value={activity.currentDay}
                    onChange={changeCurrentDay}
                  />
                </div>
                <div>
                  <label htmlFor="inputPT" className="form-label">
                    Courses
                  </label>
                  <select
                    multiple
                    onChange={(e) => {
                      const option = e.target.options;
                      const values = [];
                      for (let i = 0; i < option.length; i++) {
                        if (option[i].selected) {
                          values.push({ id: parseInt(option[i].value) });
                        }
                      }
                      setSelectedCourse(values);
                      setActivity({...activity,courses:values})
                    }}
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
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
};
export default UpdateActivityWeek;
