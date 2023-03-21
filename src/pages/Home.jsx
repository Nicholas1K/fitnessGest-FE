import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import "../style/Home.css";

const Home = () => {
  return (
    <div className="container">
      <Navbar />
      <div className="row row-cols-1 row-cols-md-3 g-4">
        <div className="col">
          <div className="h-100">
            <img
              src="image/Course.png"
              className="rounded-circle border border-primary border-opacity-50"
              alt="new course"
            />
            <div className="card-body">
              <h5 className="card-title mt-3"> New Course</h5>
              <p className="card-text mt-3">
                In this section you can create your <br /> new Course
              </p>
              <div className="mt-5">
                <Link className="btnlink" to="/addCourse">
                  Create
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="h-100">
            <img
              src="image/Personal Trainer.png"
              className="rounded-circle border border-primary border-opacity-50"
              alt="new Persona Trainer"
            />
            <div className="card-body">
              <h5 className="card-title mt-3">New Personal Trainer</h5>
              <p className="card-text mt-3">
                In this section you can create your <br /> new Trainer
              </p>
              <div className="mt-5">
                <Link className="btnlink" to="/addPersonalTrainer">
                  Create
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="h-100">
            <img
              src="image/Users.png"
              className="rounded-circle border border-primary border-opacity-50"
              alt="New User"
            />
            <div className="card-body">
              <h5 className="card-title mt-3">New User</h5>
              <p className="card-text mt-3">
                In this section you can create your <br /> new User
              </p>
              <div className="mt-5">
                <Link className="btnlink" to="/addUser">
                  Create
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="card-body">
          <h5 className="card-header text-center mt-3">
            Work view organization
          </h5>
          <div className="card-body">
            <p className="text-center card-text mt-3">
              Here you will be able to view all the interfaces for organizing
              your work flow and the work of your employees
            </p>
            <div className="row row-cols-1 row-cols-md-4 g-4">
              <Link to="/subscription" className="link" href="#">
                <img
                  src="image/Subscription.png"
                  className="imgclass rounded-circle border border-primary border-opacity-50"
                  alt="new course"
                />
                <br />
                <span className="work-view">Subscription</span>
              </Link>
              <Link to="/activity-week" className="link" href="#">
                <img
                  src="image/Day Week.png"
                  className="imgclass rounded-circle border border-primary border-opacity-50"
                  alt="new course"
                />
                <br />
                <span className="work-view">Activity of the Week</span>
              </Link>
              <Link to="/lesson" className="link" href="#">
                <img
                  src="image/Lessons.png"
                  className="imgclass rounded-circle border border-primary border-opacity-50"
                  alt="new course"
                />
                <br />
                <span className="work-view">Lessons</span>
              </Link>
              <Link className="link" href="#">
                <img
                  src="image/Day_and_time.png"
                  className="imgclass rounded-circle border border-primary border-opacity-50"
                  alt="new course"
                />
                <br />
                <span className="work-view">Day&Time work</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
