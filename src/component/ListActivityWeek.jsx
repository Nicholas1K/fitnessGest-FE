// nel back and questa è la classe DAY WEEK

import ActivityWeek from "./ActivityWeek";
import "../style/ListCourse.css";

const ListActivityWeek = ({ activity, deleteActivity }) => {

    return (
      <table className="tabContainer table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">DAY</th>
            <th scope="col">LOCAL DATE</th>
            <th scope="col">COURSES</th>
            <th scope="col">COMMAND</th>
          </tr>
        </thead>
        <tbody>
          {activity.map((act) => (
            <ActivityWeek
              key={act.id}
              id={act.id}
              day={act.day}
              currentDay={act.currentDay}
              courses={act.courses}
              deleteActivity={deleteActivity}
            />
          ))}
        </tbody>
      </table>
    );
};
export default ListActivityWeek;