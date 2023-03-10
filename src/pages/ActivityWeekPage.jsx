import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import ListActivityWeek from "../component/ListActivityWeek"
import "../style/Coursepage.css";


const ActivityWeekPage = () => {

    const [activity, setActivity] = useState([]);
    const [isLoading, setIsLoading]= useState(false);
    const [error, setError] = useState(null);

    async function fetchGetAll(){
        setIsLoading(true);
        setError(null);

        try{
            const response = await fetch("http://localhost:8080/api/dayWeek/all");

            if(!response.ok){
                throw new Error("request filed");
            }

            const data = await response.json();

            const trasformData = data.map((act)=>{
                return{
                    id:act.id,
                    day:act.day,
                    currentDay:act.currentDay,
                    courses:act.courses,
                };
            });

            setActivity(trasformData);
        }catch(error){
            setError(error.message);
        }

        setIsLoading(false);
    };

    useEffect(()=>{
        fetchGetAll();
    },[]);

    async function fetchDelete(id){
        try{
            const response = await fetch("http://localhost:8080/api/dayWeek/delete/" + id,{
                method:"DELETE"
            });
        }catch(error){
            console.error(error);
        }
        return fetchGetAll()
    };

    let content = <p>found Activities</p>

    if (activity.length > 0){
        content = <ListActivityWeek activity={activity} deleteActivity={fetchDelete} />;
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
              alt="new course"
            />
            <h2>Activity Week</h2>
          </div>
          <div className="container">
            <section>{content}</section>
          </div>
          <div className="mt-5">
            <Link className="btnlink" to="/addActivity">
              Create
            </Link>
          </div>
        </>
      );
}
export default ActivityWeekPage;