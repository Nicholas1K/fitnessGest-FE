import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import ListPersonalTrainer from "../component/ListPersonalTrainer"
import "../style/Coursepage.css";

const PersonalTrainerPage = () => {
  const [personalTrainer, setPersonalTrainer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchGetAll() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:8080/api/personalTrainer/all"
      );

      if (!response.ok) {
        throw new Error("request filed");
      }

      const data = await response.json();

      const trasformPT = data.map((pt) => {
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

      setPersonalTrainer(trasformPT);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    fetchGetAll();
  }, []);

  async function fetchDelete(id){
    try{
      const response = await fetch("http://localhost:8080/api/personalTrainer/delete/" + id,{
        method:"DELETE"
      });
    }catch(error){
      console.error(error);
    }
    return fetchGetAll()
  }

  let content = <p>found Personal Trainer</p>

  if (personalTrainer.length > 0) {
    content = <ListPersonalTrainer personalT={personalTrainer} deletePT={fetchDelete} />;
  }
  if (isLoading){
    content = <p>Loading data...</p>
  }
  if (error){
    content = <p>{error}</p>
  }

  return (
    <>
      <Navbar />
      <div className="contTitle">
        <h1 className="title">Muscle Gest</h1>
        <img
          src="image/Logo.png"
          className="imgclass rounded-circle border border-primary border-opacity-50"
          alt="personalTrainer"
        />
        <h2>Personal Trainer</h2>
      </div>
      <div className="container">
        <section>{content}</section>
      </div>
    </>
  );
};
export default PersonalTrainerPage;
