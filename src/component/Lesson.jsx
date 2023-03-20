// lesson del Backend sarebbe Time Tables
import { useNavigate } from "react-router-dom";
import "../style/ListCourse.css";

const Lesson = ({
  id,
  startTime,
  endTime,
  dayOfTheWeek,
  course,
  deleteLesson,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{startTime}</td>
        <td>{endTime}</td>
        <td>
          <ul>
            {dayOfTheWeek.map((d) => (
              <li key={d.id}>{d.day}</li>
            ))}
          </ul>
        </td>
        <td>{course}</td>
        <td>
          <button onClick={() => navigate("/update-lesson/"+ id)}>
            {/*comment*/}
            <span className="btn-update">update</span>
          </button>
          <button onClick={() => deleteLesson(id)}>
            <span className="btn-delete">delete</span>
          </button>
        </td>
      </tr>
    </>
  );
};
export default Lesson;
