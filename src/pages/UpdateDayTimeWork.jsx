import Navbar from "../component/Navbar"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../style/Coursepage.css";
import "../style/AddCourse.css";

const UpdateDayTimeWork = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const [dayTime, setDayTime] = useState(null);
      const [selectedLesson, setSelectedLesson] = useState([]);
      const [lesson, setLesson] = useState([]);
      const [selectdPersonalTrainer, setSelectdPersonalTrainer] = useState([]);
      const [personalTrainer, setPersonalTrainer] = useState([]);

      async function fetchGetAllLesson() {
        try {
          const responseLe = await fetch(
            "http://localhost:8080/api/timeTables/all"
          );

          const data = await responseLe.json();

          const trasformDataLe = data.map((le) => {
            return {
              id: le.id,
              startTime: le.startTime,
              endTime: le.endTime,
              dayOfTheWeek: le.dayOfTheWeek,
              course: le.course,
            };
          });
          setLesson(trasformDataLe);
        } catch (error) {
          throw new Error("request filed");
        }
      }

      async function fetchGetAllPersonalT() {
        try {
          const responsePt = await fetch(
            "http://localhost:8080/api/personalTrainer/all"
          );

          const data = await responsePt.json();

          const trasformDataPt = data.map((pt) => {
            return {
              id: pt.id,
              firstName: pt.firstName,
              lastName: pt.lastName,
              dateOfBirth: pt.dateOfBirth,
              workStart: pt.workStart,
              fiscalCode: pt.fiscalCode,
              telephoneNumber: pt.telephoneNumber,
              email: pt.email,
              courses: pt.courses,
            };
          });

          setPersonalTrainer(trasformDataPt);
        } catch (error) {
          throw new Error("request filed");
        }
      }

      useEffect(
        () => {
          fetchGetAllLesson();
          fetchGetAllPersonalT();
        },
        [],
        []
      );

    const fetchGetId = async (id) => {
        return fetch("http://localhost:8080/api/dayAndTimeWork/find/" + id);
    };

    useEffect(() => {
        fetchGetId(id).then((res) => {
            return res.json();
        }).then((data) => {
            if(data){
                console.log(data);
                setDayTime(data);
            }
        });
    },[id]);

    async function fetchPut(dayTW){
        const response = await fetch(
          "http://localhost:8080/api/dayAndTimeWork/update/" + dayTW.id,
          {
            method: "PUT",
            body: JSON.stringify(dayTW),
            headers: { "Content-Type": "application/json" },
          }
        );

        if(!response.ok){
            console.error("request filed")
        }else{
            navigate("/")
        }
    }
        function submitHandler(e) {
          e.preventDefault();
          fetchPut(dayTime);
          console.log(dayTime);
        }
        if(dayTime == null){
            return <h3 className="text-danger">*** Day & Time Work not found ***</h3>;
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
          <h2 className="text-center">Day & Time Work Update</h2>
          <div className="boxTable row">
            <div className="col-sm-1 col-md-5 container justify-content-center">
              <div className="container">
                <form onSubmit={submitHandler} className="row g-3">
                  <div>
                    <label htmlFor="inputPT" className="form-label">
                      Lesson
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
                        setSelectedLesson(values);
                        setDayTime({ ...dayTime, timeTables: values }); // con questa riga di codice sto settando per fare l'update
                      }}
                    >
                      {lesson.map((le) => (
                        <option key={le.id} value={le.id}>
                          {le.id}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="inputPt" className="form-label">
                        Personal trainer
                    </label>
                    <select multiple onChange={(e)=>{
                        const optionPt = e.target.options;
                        const valuesPt = [];
                        for(let i = 0; i < optionPt.length;i++){ 
                        if(optionPt[i].selected){
                            valuesPt.push({id: parseInt(optionPt[i].value)});
                        }
                        }
                        setSelectdPersonalTrainer(valuesPt);
                        setDayTime({ ...dayTime, personalTrainers: valuesPt });
                    }}
                    >
                        {personalTrainer.map((p)=>(
                            <option key={p.id} value={p.id}>
                                {p.lastName}
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
}
export default UpdateDayTimeWork;