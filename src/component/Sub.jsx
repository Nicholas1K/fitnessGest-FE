import { useNavigate } from "react-router-dom";

const Sub = ({id, type, month, price, deleteSub }) => {

    const navigate = useNavigate();

  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{type}</td>
        <td>{month}</td>
        <td>{price}</td>
        <td>
          <button onClick={() => navigate("/update-sub/" + id)}>
            <span className="btn-update">update</span>
          </button>
          <button onClick={() => deleteSub(id)}>
            <span className="btn-delete">delete</span>
          </button>
        </td>
      </tr>
    </>
  );
};
export default Sub;