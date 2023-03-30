import { useNavigate } from "react-router-dom";

const AddressUser = ({
  id,
  nation,
  region,
  city,
  province,
  postalCode,
  homeNumber,
  users,
  deleteAddressUser,
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
            {users.map((us) => (
              <li key={us.id}>
                {us.id} :{us.lastName}
              </li>
            ))}
          </ul>
        </td>
        <td>
          <button onClick={() => navigate("/update-address-user/" + id)}>
            <span className="btn-update">update</span>
          </button>
          <button onClick={() => deleteAddressUser(id)}>
            <span className="btn-delete">delete</span>
          </button>
        </td>
      </tr>
    </>
  );
};
export default AddressUser;