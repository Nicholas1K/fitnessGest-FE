import { useNavigate } from "react-router-dom";

const PersonalTrainer = ({
  id,
  firstName,
  lastName,
  dateOfBirth,
  workStart,
  fiscalCode,
  telephoneNumber,
  email,
  courses,
  deletePT,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{dateOfBirth}</td>
        <td>{workStart}</td>
        <td>{fiscalCode}</td>
        <td>{telephoneNumber}</td>
        <td>{email}</td>
        <td>{courses.map((c) => c.name)}</td>
        {/*se è una lista bisogna fare un map, c sta per corso (nome dato da me) mentre name (è il nome del parametro da puntare nel backend) se fossero stati vari si sarebbero susseguiti con una concatenazione c.name + "," + c.altro parametro */}
        <td>
          <button onClick={() => navigate("/update-personal-trainer/" + id)}>
            <span className="btn-update">update</span>
          </button>
          <button onClick={() => deletePT(id)}>
            <span className="btn-delete">delete</span>
          </button>
        </td>
      </tr>
    </>
  );
};
export default PersonalTrainer;
