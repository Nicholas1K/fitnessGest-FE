import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListDayTimeWork from "../component/ListDayTimeWork";
import Navbar from "../component/Navbar"

const DayTimeWorkPage = () => {

    const[dayTime, setDayTime] = useState([]);
    const[isLoading, setIsLoading] = useState(false);
    const[error, setError] = useState(null);

    async function fetchGetAll(){
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("http://localhost:8080/api/dayAndTimeWork/all");

            if(!response.ok){
                throw new Error("request filed");
            }
            const data = await response.json();

            const trasformData = data.map((dt) => {
                return {
                  id: dt.id,
                  timeTables: dt.timeTables,
                  personalTrainers: dt.personalTrainers,
                };
            });

            setDayTime(trasformData);

        } catch (error) {
            setError(error.message);
        }

        setIsLoading(false);
    }

    useEffect(() => {
        fetchGetAll();
    },[]);

    async function fetchDelete(id){
        try {
            const response = await fetch(
              "http://localhost:8080/api/dayAndTimeWork/delete/" + id,{
                method:"DELETE",
              });
        } catch (error) {
            console.error(error);
        }
        return fetchGetAll();
    };

    let content = <p> found your Day & Time Work</p>

    if(dayTime.length == 0){
        content = <p>Day & Time Work not found</p>;
    }
    if (dayTime.length > 0){
        content = <ListDayTimeWork dayTime={dayTime} deleteDTW={fetchDelete} />;
    }
    if(isLoading){
        content = <p>Loading data...</p>
    }
    if(error){
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
              alt="lesson"
            />
            <h2>Day & Time Work</h2>
          </div>
          <div className="container">
            <section>{content}</section>
          </div>
          <div className="mt-5">
            <Link className="btnlink" to="/addDTW">
              Create
            </Link>
          </div>
        </>
      );
}
export default DayTimeWorkPage;