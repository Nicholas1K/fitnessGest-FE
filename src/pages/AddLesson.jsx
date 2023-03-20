import Navbar from "../component/Navbar";
import "../style/Coursepage.css";
import "../style/AddCourse.css";
import { useRef, useState, useEffect } from "react";

const AddLesson = () => {

  const startTimeRef = useRef("");
  const endTimeRef = useRef("");
  const courseRef = useRef("");
  const [selectedDayWeek, setSelectedDayWeek] = useState([]);
  const [dayWeek, setDayWeek] = useState([]);
 

  async function fetchGetAllDayWeek(){
    try {
      const responseDayWeek = await fetch(
        "http://localhost:8080/api/dayWeek/all"
      );

      const data = await responseDayWeek.json();

      const trasformDW = data.map((dw)=>{
        return { id: dw.id, day: dw.day, courses: dw.courses };
      });

      setDayWeek(trasformDW);
    } catch (error) {
      throw new Error("request filed");
    }
  };


     useEffect(()=>{
      fetchGetAllDayWeek();
     },[]);

     function refresh(){
      window.location.reload();
     }

     function submitHandler(event){
      event.preventDefault();
      console.log("dati inviati correttamente");

      const lesson = {
        startTime: startTimeRef.current.value,
        endTime: endTimeRef.current.value,
        dayOfTheWeek: selectedDayWeek,
        course: courseRef.current.value,
      };
      console.log(lesson);

      fetch("http://localhost:8080/api/timeTables/create", {
        method: "POST",
        body: JSON.stringify(lesson),
        headers: { "Content-Type": "application/json" },
      });

      refresh();
     };

  return (
    <>
      <Navbar />
      <div className="contTitle container">
        <h1 className="title text-center">Muscle Gest</h1>
        <img
          src="image/Logo.png"
          className="imgclass rounded-circle border border-primary border-opacity-50"
          alt="new course"
        />
        <h2 className="text-center">Lesson Create</h2>
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
                    ref={startTimeRef}
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
                    ref={endTimeRef}
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
                      setSelectedDayWeek(values);
                    }}
                  >
                    {dayWeek.map((dw) => (
                      <option key={dw.id} value={dw.id}>
                        {dw.day}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="inputPT" className="form-label">
                    Curse
                  </label>
                  <input
                    type="text"
                    placeholder="name course"
                    name="course"
                    ref={courseRef}
                  />
                </div>
                <div className="box-footer">
                  <button type="submit" className="save mt-2">
                    SAVE
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
export default AddLesson;
