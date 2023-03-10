import PersonalTrainer from "./PersonalTrainer";
import "../style/ListCourse.css";

const ListPersonalTrainer = ({personalT, deletePT}) => {
  
  return (
    <table className="tabContainer table table-dark table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">FIRSTNAME</th>
          <th scope="col">LASTNAME</th>
          <th scope="col">DATEOFBIRTH</th>
          <th scope="col">WORKSTART</th>
          <th scope="col">FISCALCODE</th>
          <th scope="col">TELEPHONENUMBER</th>
          <th scope="col">EMAIL</th>
          <th scope="col">COURSES</th>
          <th scope="col">COMMAND</th>
        </tr>
      </thead>
      <tbody>
        {personalT.map((pt) => (
          <PersonalTrainer
            key={pt.id}
            id={pt.id}
            firstName={pt.firstName}
            lastName={pt.lastName}
            dateOfBirth={pt.dateOfBirth}
            workStart={pt.workStart}
            fiscalCode={pt.fiscalCode}
            telephoneNumber={pt.telephoneNumber}
            email={pt.email}
            courses={pt.courses}
            deletePT={deletePT}
          />
        ))}
      </tbody>
    </table>
  );
};
export default ListPersonalTrainer;
