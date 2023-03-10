import { useNavigate } from "react-router-dom";

const Course = ({ id, name, deleteCourse }) => {
  const navigate = useNavigate();

  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>
          <button onClick={() => navigate("/update-course/" + id)}>
            <span className="btn-update">update</span>
          </button>
          <button onClick={() => deleteCourse(id)}>
            <span className="btn-delete">delete</span>
          </button>
        </td>
      </tr>
    </>
  );
};
export default Course;
