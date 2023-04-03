import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../component/Navbar"

const UpdatePersonaT = ()=>{

    const navigate = useNavigate();
    const {id} = useParams();
    const [personalT, setPersonalT] = useState(null);
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

    const fetchGetId = async (id) => {
        return fetch("http://localhost:8080/api/personalTrainer/find/" + id);
    };

    useEffect(()=>{
        fetchGetId(id).then((res)=>{
            return res.json();
        }).then((data)=>{
            if(data){
                console.log(data);
                setPersonalT(data);
            }
        });
    },[id]);

    //funzioni per fare l'update
    function changeFristName(element){
        const {name, value} = element.target;
        setPersonalT({...personalT,[name]:value});
    }
    function changeLastName(element) {
      const { name, value } = element.target;
      setPersonalT({ ...personalT, [name]: value });
    }
    function changeDateOfBirth(element) {
      const { name, value } = element.target;
      setPersonalT({ ...personalT, [name]: value });
    }
    function changeWorkStart(element) {
      const { name, value } = element.target;
      setPersonalT({ ...personalT, [name]: value });
    }
    function changeFiscalCode(element) {
      const { name, value } = element.target;
      setPersonalT({ ...personalT, [name]: value });
    }
    function changeTelephoneNumber(element) {
      const { name, value } = element.target;
      setPersonalT({ ...personalT, [name]: value });
    }
    function changeEmail(element) {
      const { name, value } = element.target;
      setPersonalT({ ...personalT, [name]: value });
    }


    async function fetchPut(personalTrainer){
        const response = await fetch(
          "http://localhost:8080/api/personalTrainer/update/" + personalTrainer.id,
          {
            method: "PUT",
            body: JSON.stringify(personalTrainer),
            headers: { "Content-Type": "application/json" },
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
        fetchPut(personalT);
        console.log(personalT);
    }
    if(personalT === null){
        return <h3 className="text-danger">*** personal trainer not found ***</h3>;
    };

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
          <h2 className="text-center">Personal Trainer Update</h2>
          <div className="boxTable row">
            <div className="col-sm-1 col-md-5 container justify-content-center">
              <div className="container">
                <form onSubmit={submitHandler} className="row g-3">
                  <div>
                    <label htmlFor="inputPT" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="insert name"
                      name="firstName"
                      value={personalT.firstName}
                      onChange={changeFristName}
                    />
                  </div>
                  <div>
                    <label htmlFor="inputPT" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="insert Last Name"
                      name="lastName"
                      value={personalT.lastName}
                      onChange={changeLastName}
                    />
                  </div>
                  <div>
                    <label htmlFor="inputPT" className="form-label">
                      Birthday
                    </label>
                    <input
                      type="text"
                      placeholder="yyyy-MM-dd"
                      name="birthday"
                      value={personalT.birthday}
                      onChange={changeDateOfBirth}
                    />
                  </div>
                  <div>
                    <label htmlFor="inputPT" className="form-label">
                      Work Start
                    </label>
                    <input
                      type="text"
                      placeholder="yyyy-MM-dd"
                      name="workStart"
                      value={personalT.workStart}
                      onChange={changeWorkStart}
                    />
                  </div>
                  <div>
                    <label htmlFor="inputPT" className="form-label">
                      FiscalCode
                    </label>
                    <input
                      type="text"
                      placeholder="insert FiscalCode"
                      name="fiscalCode"
                      value={personalT.fiscalCode}
                      onChange={changeFiscalCode}
                    />
                  </div>
                  <div>
                    <label htmlFor="inputPT" className="form-label">
                      TelephonNumber
                    </label>
                    <input
                      type="text"
                      placeholder="insert TelephonNumber"
                      name="telephoneNumber"
                      value={personalT.telephoneNumber}
                      onChange={changeTelephoneNumber}
                    />
                  </div>
                  <div>
                    <label htmlFor="inputPT" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      placeholder="insert email"
                      name="email"
                      value={personalT.email}
                      onChange={changeEmail}
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
                        for (let i = 0; i < option.length; i++){
                          if (option[i].selected) {
                            values.push({ id: parseInt(option[i].value) });
                          }
                        }
                        setSelectedCourse(values);
                        setPersonalT({...personalT,courses:values}) // con questa riga di codice sto settando per fare l'update
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
}
export default UpdatePersonaT;