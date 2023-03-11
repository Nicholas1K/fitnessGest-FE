import Navbar from "../component/Navbar"
import "../style/Coursepage.css";
import "../style/AddCourse.css";
import { useRef, useState, useEffect } from "react";

const AddActivityWeek = () => {

    //invio dati
    const dayRef = useRef("");
    const currentDayRef = useRef("");
    const [selectedCourse, setSelectedCourse] = useState([]);
    const [courses, setCourses] = useState([]);

      async function fetchGetAllCourses() {
        try {
          const responseCourse = await fetch(
            "http://localhost:8080/api/course/all"
          );

          const data = await responseCourse.json();

          const trasformCourse = data.map((c) => {
            return { id: c.id, name: c.name };
          });

          setCourses(trasformCourse);
        } catch (error) {
          throw new Error("request filed");
        }
      }
      useEffect(() => {
        fetchGetAllCourses();
      }, []);

      function refresh() {
        window.location.reload();
      }

      function submitHandler(event){
        event.preventDefault();

        console.log("dati inviati correttamente");

        const activityWeek = {
            day: dayRef.current.value,
            currentDay:currentDayRef.current.value,
            courses: selectedCourse,
        };
        console.log(activityWeek);

        fetch("http://localhost:8080/api/dayWeek/create", {
          method: "POST",
          body: JSON.stringify(activityWeek),
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
          <h2 className="text-center">Activity Week Create</h2>
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
                      ref={dayRef}
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
                      ref={currentDayRef}
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
                    <button
                      type="submit"
                      className="save mt-2"
                    >
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
}
export default AddActivityWeek;
