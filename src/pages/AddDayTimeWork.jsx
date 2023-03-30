import Navbar from "../component/Navbar";
import "../style/Coursepage.css";
import "../style/AddCourse.css";
import { useRef, useState, useEffect } from "react";

const AddDayTimeWork = () => {
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

  function refresh() {
    window.location.reload();
  }

  function submitHandler(event) {
    event.preventDefault();
    console.log("dati inviati correttamente");

    const dayTimeWork = {
      timeTables: selectedLesson,
      personalTrainers: selectdPersonalTrainer,
    };
    console.log(dayTimeWork);

    fetch("http://localhost:8080/api/dayAndTimeWork/create",{
        method:"POST",
        body: JSON.stringify(dayTimeWork),
        headers:{"Content-Type" : "application/json"},
    });

    refresh();
  }

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
        <h2 className="text-center">Day & Time Work Create</h2>
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
                    }}
                  >
                    {lesson.map((le) => (
                      <option key={le.id} value={le.id}>
                        {le.id} : {le.course}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="inputPT" className="form-label">
                    Personal Trainer
                  </label>
                  <select
                    multiple
                    onChange={(e) => {
                      const optionPT = e.target.options;
                      const valuesPT = [];
                      for (let i = 0; i < optionPT.length; i++) {
                        if (optionPT[i].selected) {
                          valuesPT.push({ id: parseInt(optionPT[i].value) });
                        }
                      }
                      setSelectdPersonalTrainer(valuesPT);
                    }}
                  >
                    {personalTrainer.map((pt) => (
                      <option key={pt.id} value={pt.id}>
                       {pt.id} : {pt.lastName}
                      </option>
                    ))}
                  </select>
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
export default AddDayTimeWork;
