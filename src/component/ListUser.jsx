import User from "./User";
import "../style/ListCourse.css";

const ListUser = (userList, deleteUser) => {
  return (
    <table className="tabContainer table table-dark table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">FIRSTNAME</th>
          <th scope="col">LASTNAME</th>
          <th scope="col">DATEOFBIRTH</th>
          <th scope="col">FISCALCODE</th>
          <th scope="col">TELEPHONENUMBER</th>
          <th scope="col">EMAIL</th>
          <th scope="col">COURSES</th>
          <th scope="col">SUBSCRIPTION</th>
          <th scope="col">COMMAND</th>
        </tr>
      </thead>
      <tbody>
        {userList.map((us) => (
          <User
            key={us.id}
            id={us.id}
            firstName={us.firstName}
            lastName={us.lastName}
            dateOfBirth={us.dateOfBirth}
            fiscalCode={us.fiscalCode}
            telephoneNumber={us.telephoneNumber}
            email={us.email}
            courses={us.courses}
            subscription={us.subscription}
            deleteUser={deleteUser}
          />
        ))}
      </tbody>
    </table>
  );
};
export default ListUser;
