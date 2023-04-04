import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../component/Navbar";
import { useEffect, useState } from "react";

const UpadateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedSub, setSelectedSub] = useState({});

  async function fetchGetAllSubscription() {
    try {
      const response = await fetch(
        "http://localhost:8080/api/subscription/all"
      );
      const data = await response.json();
      const trasformData = data.map((sub) => {
        return {
          id: sub.id,
          type: sub.type,
          month: sub.month,
          price: sub.price,
        };
      });

      setSubscription(trasformData);
    } catch (error) {
      throw new Error("request filed");
    }
  }

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

  useEffect(
    () => {
      fetchGetAllCourses();
      fetchGetAllSubscription();
    },
    [],
    []
  );

  const fetchGetId = async (id) => {
    return fetch("http://localhost:8080/api/user/find/" + id);
  };

  useEffect(() => {
    fetchGetId(id)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data) {
          console.log(data);
          setUser(data);
        }
      });
  }, [id]);

  function changeFristName(element) {
    const { name, value } = element.target;
    setUser({ ...user, [name]: value });
  }
  function changeLastName(element) {
    const { name, value } = element.target;
    setUser({ ...user, [name]: value });
  }
  function changeDateOfBirth(element) {
    const { name, value } = element.target;
    setUser({ ...user, [name]: value });
  }
  function changeFiscalCode(element) {
    const { name, value } = element.target;
    setUser({ ...user, [name]: value });
  }
  function changeTelephoneNumber(element) {
    const { name, value } = element.target;
    setUser({ ...user, [name]: value });
  }
  function changeEmail(element) {
    const { name, value } = element.target;
    setUser({ ...user, [name]: value });
  }
  async function fetchPut(updateUser) {
    const response = await fetch(
      "http://localhost:8080/api/user/update/" + updateUser.id,
      {
        method: "PUT",
        body: JSON.stringify(updateUser),
        headers: { "Content-Type": "application/json" },
      }
    );

    if(!response.ok){
        console.error("request filed")
    }else{
        navigate("/")
    }
  };

      function submitHandler(e) {
        e.preventDefault();
        fetchPut(user);
        console.log(user);
      }
      if(user === null){
        return (
          <h3 className="text-danger">*** user not found ***</h3>
        );
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
        <h2 className="text-center">User Update</h2>
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
                    value={user.firstName}
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
                    value={user.lastName}
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
                    value={user.birthday}
                    onChange={changeDateOfBirth}
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
                    value={user.fiscalCode}
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
                    value={user.telephoneNumber}
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
                    value={user.email}
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
                      for (let i = 0; i < option.length; i++) {
                        if (option[i].selected) {
                          values.push({ id: parseInt(option[i].value) });
                        }
                      }
                      setSelectedCourse(values);
                      setUser({ ...user, courses: values }); // con questa riga di codice sto settando per fare l'update
                    }}
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="inputPT" className="form-label">
                    Subscription
                  </label>
                  <select
                    multiple
                    onChange={(e) => {
                      const option = e.target.options;
                      let values = {
                        id: option.id,
                        type: option.type,
                        month: option.month,
                        price: option.price,
                      };
                      for (let i = 0; i < option.length; i++) {
                        if (option[i].selected) {
                          values = { id: parseInt(option[i].value) };
                        }
                      }
                      setSelectedSub(values);
                      setUser({ ...user, subscription: values });
                    }}
                  >
                    {subscription.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.type},{sub.month}
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
export default UpadateUser;
