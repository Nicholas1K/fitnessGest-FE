import { useNavigate } from "react-router-dom";
import "../style/ListCourse.css";

const User = ({
  id,
  firstName,
  lastName,
  dateOfBirth,
  fiscalCode,
  telephoneNumber,
  email,
  course,
  subscription,
  deleteUser,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{dateOfBirth}</td>
        <td>{fiscalCode}</td>
        <td>{telephoneNumber}</td>
        <td>{email}</td>
        <td>
          <ul> {/* and serve per fare leggere il .map anche quando è vuoto oppure ci sono problemi di lettura in caso renderizzerà a schermo au array vuoto*/}
            {course && course.map((c) => (
              <li key={c.id}>{c.name}</li>
            ))}
          </ul>
        </td>
        <td>
          {subscription.id} : {subscription.type}
        </td>
        <td>
          {/*TODO function to update */}
          <button>
            <span className="btn-update">update</span>
          </button>
          <button onClick={() => deleteUser(id)}>
            <span className="btn-delete">delete</span>
          </button>
        </td>
      </tr>
    </>
  );
};
export default User;
