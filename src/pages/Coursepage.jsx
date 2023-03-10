import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import ListCourse from "../component/ListCourse";
import "../style/Coursepage.css"

const Coursepage = () => { 
  const [course, setCourse] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchGetAll() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/api/course/all");

      if (!response.ok) {
        throw new Error("request filed");
      }
      const data = await response.json();

      const trasformCourse = data.map((course) => {
        return { id: course.id, name: course.name };
      });

      setCourse(trasformCourse);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }

  async function fetchDelete(id){
    try{
      const response = await fetch("http://localhost:8080/api/course/delete/" + id,{
        method: "DELETE",
      });
    }catch(error){
      console.error(error);
    }
    return fetchGetAll();
  }

  useEffect(() => {
    fetchGetAll();
  }, []);

  let content = <p>found you course</p>;

  if (course.length > 0) {
    content = <ListCourse courses={course} deleteCorse={fetchDelete} />; 
  }
  if (isLoading) {
    content = <p>Loading data...</p>;
  }
  if (error) {
    content = <p>{error}</p>;
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
        <h2>Course</h2>
      </div>
      <div className="container">
        <section>{content}</section>
      </div>
    </>
  );
};
export default Coursepage;
