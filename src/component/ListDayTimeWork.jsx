import DayTimeWork from "./DayTimeWork";
import "../style/ListCourse.css";

const ListDayTimeWork = ({ dayTime, deleteDTW }) => {
  return (
    <table className="tabContainer table table-dark table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">LESSON</th>
          <th scope="col">PERSONAL TRAINER</th>
          <th scope="col">COMMAND</th>
        </tr>
      </thead>
      <tbody>
        {dayTime.map((dt) => (
          <DayTimeWork
            key={dt.id}
            id={dt.id}
            timeTables={dt.timeTables}
            personalTrainers={dt.personalTrainers}
            deleteDTW={deleteDTW}
          />
        ))}
      </tbody>
    </table>
  );
};
export default ListDayTimeWork;