import Lesson from "./Lesson";
import "../style/ListCourse.css";

const ListLesson = ({ lessonLi, deleteLesson }) => {

    return (
      <table className="tabContainer table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">START LESSON</th>
            <th scope="col">END LESSON</th>
            <th scope="col">DAY</th>
            <th scope="col">COURSE</th>
            <th scope="col">COMMAND</th>
          </tr>
        </thead>
        <tbody>
          {lessonLi.map((le) => (
            <Lesson
              key={le.id}
              id={le.id}
              startTime={le.startTime}
              endTime={le.endTime}
              dayOfTheWeek={le.dayOfTheWeek}
              course={le.course}
              deleteLesson={deleteLesson}
            />
          ))}
        </tbody>
      </table>
    );
};
export default ListLesson;