import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import ListLesson from "../component/ListLesson"

const LessonPage = () => {

    const [lesson, setLesson] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fetchGetAll(){
        setIsLoading(true);
        setError(null);

        try{
            const response = await fetch("http://localhost:8080/api/timeTables/all");

            if(!response.ok){
                throw new Error("request filed");
            }
            const data = await response.json();

            const trasformData = data.map((le) => {
                return {
                  id: le.id,
                  startTime: le.startTime,
                  endTime: le.endTime,
                  dayOfTheWeek: le.dayOfTheWeek,
                  course: le.course,
                };
            });
            setLesson(trasformData);
        }catch(error){
            setError(error.message);
        }

        setIsLoading(false);
    }

    useEffect(()=>{
        fetchGetAll();
    },[]);

    async function fetchDelete(id){
        try{
            const response = await fetch(
              "http://localhost:8080/api/timeTables/delete/" + id,{
                method:"DELETE"
              });
        }catch(error){
            console.error(error);
        }
        return fetchGetAll()
    };

    let content = <p> found your lesson</p>

    if(lesson.length == 0){
        content = <p>Lesson not found</p>
    }

    if(lesson.length > 0){
        content = <ListLesson lessonLi={lesson} deleteLesson={fetchDelete} />;
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
      <h2>Lesson</h2>
    </div>
    <div className="container">
      <section>{content}</section>
    </div>
    <div className="mt-5">
      <Link className="btnlink" to="/addLesson">
        Create
      </Link>
    </div>
  </>
);
}
export default LessonPage;