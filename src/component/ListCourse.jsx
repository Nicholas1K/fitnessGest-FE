import Course from "./Course";
import "../style/ListCourse.css"

const ListCourse = ({courses, deleteCorse})=>{
    return (
      <table className="tabContainer table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">NAME</th>
            <th scope="col">COMMAND</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <Course
              key={course.id}
              id={course.id}
              name={course.name}
              deleteCourse={deleteCorse}
            />
          ))}
        </tbody>
      </table>
    );
}
export default ListCourse;