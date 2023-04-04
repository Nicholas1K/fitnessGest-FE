import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import { Routes,Route } from 'react-router-dom';
import Home from "./pages/Home";
import Coursepage from "./pages/Coursepage"
import AddCourse from './pages/AddCourse';
import UpdateCorse from './pages/UpdateCourse';
import AddPersonalTrainer from './pages/AddPersonalTrainer';
import PersonalTrainerPage from './pages/PersonalTrainerPage';
import AddAddressPT from './pages/AddAddressPT';
import Subscription from './pages/Subscription';
import UpdateSubscription from "./pages/UpdateSubscription"
import AddSubscription from './pages/AddSubscription';
import UpdatePersonaT from './pages/UpdatePersonalT';
import ActivityWeekPage from './pages/ActivityWeekPage';
import AddActivityWeek from "./pages/AddActivityWeek";
import UpdateActivityWeek from './pages/UpdateActivityWeek';
import LessonPage from './pages/LessonPage';
import AddLesson from "./pages/AddLesson";
import Updatelesson from './pages/UpdateLesson';
import UserPage from './pages/UserPage';
import AddUser from './pages/AddUser';
import AddAddressUser from './pages/AddAddressUser';
import AddressPTPage from './pages/AddressPTPage';
import AddressUserPage from './pages/AddressUserPage';
import UpdateAddressPT from './pages/UpdateAddressPT';
import UpdateAddressUser from './pages/UpdateAddressUser';
import AddDayTimeWork from './pages/AddDayTimeWork';
import DayTimeWorkPage from './pages/DayTimeWorkPage';
import UpdateDayTimeWork from './pages/UpdateDayTimeWork';
import UpadateUser from './pages/UpadateUser';


function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course" element={<Coursepage />} />
        <Route path="/addCourse" element={<AddCourse />} />
        <Route path="/update-course/:id" element={<UpdateCorse />} />
        <Route path="/personal-trainer" element={<PersonalTrainerPage />} />
        <Route path="/addPersonalTrainer" element={<AddPersonalTrainer />} />
        <Route path="/add-AddressPT" element={<AddAddressPT />} />
        <Route path="/addressPTpage" element={<AddressPTPage />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/update-sub/:id" element={<UpdateSubscription />} />
        <Route
          path="/update-personal-trainer/:id"
          element={<UpdatePersonaT />}
        />
        <Route path="/addSubscription" element={<AddSubscription />} />
        <Route path="/activity-week" element={<ActivityWeekPage />} />
        <Route path="/addActivity" element={<AddActivityWeek />} />
        <Route path="/update-activity/:id" element={<UpdateActivityWeek />} />
        <Route path="/lesson" element={<LessonPage />} />
        <Route path="/addLesson" element={<AddLesson />} />
        <Route path="/update-lesson/:id" element={<Updatelesson />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/add-address-user" element={<AddAddressUser />} />
        <Route path="/addressUSPage" element={<AddressUserPage />}/>
        <Route path='/update-address-pt/:id' element={<UpdateAddressPT />} />
        <Route path='/update-address-user/:id' element={<UpdateAddressUser />}/>
        <Route path='/daytimeWork' element={<DayTimeWorkPage />}/>
        <Route path='/addDTW' element={<AddDayTimeWork />}/>
        <Route path='/update-dayTimeWork/:id' element={<UpdateDayTimeWork/>}/>
        <Route path='/update-user/:id' element={<UpadateUser />}/>
      </Routes>
    </>
  );
}

export default App
