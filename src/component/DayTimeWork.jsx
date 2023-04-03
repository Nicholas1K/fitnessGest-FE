import { useNavigate } from "react-router-dom";
import "../style/ListCourse.css";

const DayTimeWork = ({ id, timeTables, personalTrainers,deleteDTW
 }) => {
    const navigate = useNavigate();
  return (
    <>
      <tr>
        <td>{id}</td>
        <td>
          <ul>
            {timeTables.map((tt) => (
              <li key={tt.id}>{tt.id}</li>
            ))}
          </ul>
        </td>
        <td>
          <ul>
            {personalTrainers.map((pt) => (
              <li key={pt.id}>{pt.lastName}</li>
            ))}
          </ul>
        </td>
        <td>
          <button onClick={() => navigate("/update-dayTimeWork/" + id)}>
            <span className="btn-update">update</span>
          </button>
          <button onClick={() => deleteDTW(id)}>
            <span className="btn-delete">delete</span>
          </button>
        </td>
      </tr>
    </>
  );
};
export default DayTimeWork;
