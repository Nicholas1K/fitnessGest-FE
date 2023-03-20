// nel back and questa è la classe DAY WEEK

import { useNavigate } from "react-router-dom";
import "../style/ListCourse.css";

const ActivityWeek = ({ id, day, courses, deleteActivity }) => {

  const navigate = useNavigate();

  return (
    <tr>
      <td>{id}</td>
      <td>{day}</td>
      <td>
        <ul>
          {courses.map((c) => <li key={c.id}>{c.name}</li>)}
        </ul>
      </td>
      <td>
        <button onClick={() => navigate("/update-activity/" + id)}>
          <span className="btn-update">update</span>
        </button>
        <button onClick={() => deleteActivity(id)}>
          <span className="btn-delete">delete</span>
        </button>
      </td>
    </tr>
  );
};
export default ActivityWeek;
