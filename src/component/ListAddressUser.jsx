import AddressUser from "./AddressUser";

const ListAddressUser = ({ addressUser, deleteAddressUser }) => {
  return (
    <table className="tabContainer table table-dark table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">NATION</th>
          <th scope="col">REGION</th>
          <th scope="col">CITY</th>
          <th scope="col">PROVINCE</th>
          <th scope="col">POSTAL CODE</th>
          <th scope="col">HOME NUMBER</th>
          <th scope="col">USER</th>
          <th scope="col">COMMAND</th>
        </tr>
      </thead>
      <tbody>
        {addressUser.map((us) => (
          <AddressUser
            key={us.id}
            id={us.id}
            nation={us.nation}
            region={us.region}
            city={us.city}
            province={us.province}
            postalCode={us.postalCode}
            homeNumber={us.homeNumber}
            users={us.users}
            deleteAddressUser={deleteAddressUser}
          />
        ))}
      </tbody>
    </table>
  );
};
export default ListAddressUser;