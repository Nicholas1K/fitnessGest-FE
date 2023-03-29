import { useNavigate } from "react-router-dom";

const AddressPT = ({
  id,
  nation,
  region,
  city,
  province,
  postalCode,
  homeNumber,
  personalTrainers,
  deleteAddressPT
}) => {

    const navigate = useNavigate();

  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{nation}</td>
        <td>{region}</td>
        <td>{city}</td>
        <td>{province}</td>
        <td>{postalCode}</td>
        <td>{homeNumber}</td>
        <td>
          <ul>
            {personalTrainers.map((pt) => (
              <li key={pt.id}>
                {pt.id} :
                {pt.lastName}
              </li>
            ))}
          </ul>
        </td>
        <td>
          <button onClick={() => navigate("/update-address-pt/" + id)}>
            <span className="btn-update">update</span>
          </button>
          <button onClick={() => deleteAddressPT(id)}>
            <span className="btn-delete">delete</span>
          </button>
        </td>
      </tr>
    </>
  );
};
export default AddressPT