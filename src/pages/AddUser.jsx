import Navbar from "../component/Navbar";
import "../style/Coursepage.css";
import "../style/AddCourse.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  //Settaggio
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [courses, setCourses] = useState([]);
  const [subscription, setSubscription] = useState([]);

  //Controllo
  const [checkFirstName, setCheckFirstName] = useState("");
  const [checkLastName, setCheckLastName] = useState("");
  const [checkBirthday, setCheckBirthday] = useState("");
  const [checkEmail, setCheckEmail] = useState("");
  const [btnOnOff, setBtnOnOff] = useState(true);

  //invio dati
  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const dateOfBirthRef = useRef("");
  const emailRef = useRef("");
  const fiscalCodeRef = useRef("");
  const telephoneNumberRef = useRef("");

  const [selectedCourse, setSelectedCourse] = useState([]);
  const [selectedSub, setSelectedSub] = useState({});

  //redirect
  const navigate = useNavigate();

  //funzioni
  const checkName = (e) => {
    const selectedName = e.target.value;
    setFirstName(selectedName);

    if (/^[a-z]{3,}$/.test(selectedName)) {
      setCheckFirstName(true);
    } else {
      setCheckFirstName(false);
    }
  };
  const checkSurname = (e) => {
    const selectedSurname = e.target.value;
    setLastName(selectedSurname);

    if (/^[a-z]{3,}$/.test(selectedSurname)) {
      setCheckLastName(true);
    } else {
      setCheckLastName(false);
    }
  };
  const checkAdult = (e) => {
    const selectedAge = e.target.value;
    const currentDate = new Date();
    setBirthday(selectedAge);

    if (currentDate.getFullYear() - selectedAge.split("-")[0] >= 18) {
      setCheckBirthday(true);
    } else {
      setCheckBirthday(false);
    }
  };

  const controllEmail = (e) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(enteredEmail)) {
      setCheckEmail(true);
    } else {
      setCheckEmail(false);
    }
  };

  useEffect(() => {
    if (checkFirstName && checkLastName && checkBirthday && checkEmail) {
      setBtnOnOff(false);
    } else {
      setBtnOnOff(true);
    }
  }, [checkFirstName, checkLastName, checkBirthday, checkEmail]);

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

  useEffect(
    () => {
      fetchGetAllCourses();
      fetchGetAllSubscription();
    },
    [],
    []
  );

  function submitHandler(event) {
    event.preventDefault();

    console.log("dati inviati correttamente");

    const user = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      dateOfBirth: dateOfBirthRef.current.value,
      fiscalCode: fiscalCodeRef.current.value,
      telephoneNumber: telephoneNumberRef.current.value,
      email: emailRef.current.value,
      courses: selectedCourse,
      subscription: selectedSub,
    };
    console.log(user);

    fetch("http://localhost:8080/api/user/create", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    }).then(() => navigate("/add-address-user"));
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
        <h2 className="text-center">User Create</h2>
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
                    value={firstName}
                    onChange={checkName}
                    ref={firstNameRef}
                  />
                  {firstName.length > 1 && !checkFirstName && (
                    <span className="text-danger">nome errato</span>
                  )}
                </div>
                <div>
                  <label htmlFor="inputPT" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="insert Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={checkSurname}
                    ref={lastNameRef}
                  />
                  {lastName.length > 1 && !checkLastName && (
                    <span className="text-danger">nome errato</span>
                  )}
                </div>
                <div>
                  <label htmlFor="inputPT" className="form-label">
                    Birthday
                  </label>
                  <input
                    type="text"
                    placeholder="yyyy-MM-dd"
                    name="birthday"
                    value={birthday}
                    onChange={checkAdult}
                    ref={dateOfBirthRef}
                  />
                  {birthday.length > 1 && !checkBirthday && (
                    <span className="text-danger">devi essere maggiorenne</span>
                  )}
                </div>
                <div>
                  <label htmlFor="inputPT" className="form-label">
                    FiscalCode
                  </label>
                  <input
                    type="text"
                    placeholder="insert FiscalCode"
                    name="fiscalCode"
                    ref={fiscalCodeRef}
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
                    ref={telephoneNumberRef}
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
                    value={email}
                    onChange={controllEmail}
                    ref={emailRef}
                  />
                  {email.length > 1 && !checkEmail && (
                    <span className="text-danger">email errata</span>
                  )}
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
                <div>
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
                  <button
                    type="submit"
                    className="save mt-2"
                    disabled={btnOnOff}
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
};
export default AddUser;
