// nel back and questa è la classe DAY WEEK

import { useNavigate } from "react-router-dom";

const ActivityWeek = ({ id, day, currentDay, courses, deleteActivity }) => {

  const navigate = useNavigate();

  return (
    <tr>
      <td>{id}</td>
      <td>{day}</td>
      <td>{currentDay}</td>
      <td>{courses.map((c) => c.name)}</td>
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
