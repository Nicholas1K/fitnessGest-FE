import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../component/Navbar";
import "../style/Coursepage.css";
import "../style/AddCourse.css";

const UpdateSubscription = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sub, setSub] = useState(null);

  const fetchGetId = async (id) => {
    return fetch("http://localhost:8080/api/subscription/find/" + id);
  };

  useEffect(() => {
    fetchGetId(id).then((res) => {
        return res.json();
      }).then((data) => {
        if (data) {
          console.log(data);
          setSub(data);
        }
      });
  }, [id]);

  function changeType(element) {
    const { name, value } = element.target;
    setSub({ ...sub, [name]:value });
  }
  function changeMonth(element) {
    const { name, value } = element.target;
    setSub({ ...sub, [name]:value });
  }
  function changePrice(element) {
    const { name, value } = element.target;
    setSub({ ...sub, [name]:value });
  }

  async function fetchPut(subscription) {
    const response = await fetch(
      "http://localhost:8080/api/subscription/update/" + subscription.id,
      {
        method: "PUT",
        body: JSON.stringify(subscription),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      console.error("request failed");
    } else {
      navigate("/");
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    fetchPut(sub);
  }
  if (sub === null) {
    return <h3 className="text-danger">*** membership not found ***</h3>;
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
        <h2 className="text-center">Membership Update</h2>
        <div className="boxTable row">
          <div className="col-sm-1 col-md-5 container justify-content-center">
            <div className="">
              <form onSubmit={submitHandler} className="row g-3">
                <div>
                  <label htmlFor="inputCorso" className="form-label">
                    Tipo
                  </label>
                  <input
                    type="text"
                    name="type"
                    id="type"
                    value={sub.type}
                    onChange={changeType}
                  />
                </div>
                <div>
                  <label htmlFor="inputCorso" className="form-label">
                    Mese
                  </label>
                  <input
                    type="text"
                    name="month"
                    id="month"
                    value={sub.month}
                    onChange={changeMonth}
                  />
                </div>
                <div>
                  <label htmlFor="inputCorso" className="form-label">
                    Prezzo
                  </label>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    value={sub.price}
                    onChange={changePrice}
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
};
export default UpdateSubscription;
