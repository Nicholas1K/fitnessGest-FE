import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../component/Navbar"

const Updatelesson = ()=>{

    const navigate = useNavigate();
    const {id} = useParams();
    const [lesson, setLesson] = useState(null);
    const [selectedActivity, setSelectedActivity] = useState([]);
    const [activity, setActivity] = useState([]);

    async function fetchGetAllActivity(){
        try {
            const response = await fetch(
              "http://localhost:8080/api/dayWeek/all"
            );
            const data = await response.json();
            const trasformData = data.map((dw)=>{
                return { id: dw.id, day: dw.day, courses: dw.courses };
            });

            setActivity(trasformData);
        } catch (error) {
            throw new Error("request filed");
        }
    };

    useEffect(()=>{
        fetchGetAllActivity();
    },[]);

    const fetchGetId = async(id)=>{
        return fetch("http://localhost:8080/api/timeTables/find/"+ id);
    };

    useEffect(()=>{
        fetchGetId(id).then((res)=>{
            return res.json();
        }).then((data)=>{
            if(data){
                console.log(data);
                setLesson(data);
            }
        })
    },[id]);

    function changeStartTime(element){
        const{name,value}=element.target;
        setLesson({...lesson,[name]:value});
    }
    function changeEndTime(element) {
      const { name, value } = element.target;
      setLesson({ ...lesson, [name]: value });
    }
    function changeCourse(element) {
      const { name, value } = element.target;
      setLesson({ ...lesson, [name]: value });
    }

    async function fetchPut(le){
        const response = await fetch(
          "http://localhost:8080/api/timeTables/update/" + le.id,
          {
            method:"PUT",
            body:JSON.stringify(le),
            headers:{"Content-Type":"application/json"},
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
        fetchPut(lesson);
        console.log(lesson);
    }
    if(lesson == null){
        return <h3 className="text-danger">*** lesson not found ***</h3>;
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
                      Start Time
                    </label>
                    <input
                      type="text"
                      placeholder="hh:mm"
                      name="startTime"
                      value={lesson.startTime}
                      onChange={changeStartTime}
                    />
                  </div>
                  <div>
                    <label htmlFor="inputPT" className="form-label">
                      End Time
                    </label>
                    <input
                      type="text"
                      placeholder="hh:mm"
                      name="endTime"
                      value={lesson.endTime}
                      onChange={changeEndTime}
                    />
                  </div>
                  <div>
                    <label htmlFor="inputPT" className="form-label">
                      Day
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
                        setSelectedActivity(values);
                        setLesson({ ...lesson, day: values });
                      }}
                    >
                      {activity.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.day}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="inputPT" className="form-label">
                      Course
                    </label>
                    <input
                      type="text"
                      placeholder="name course"
                      name="course"
                      value={lesson.course}
                      onChange={changeCourse}
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
export default Updatelesson;