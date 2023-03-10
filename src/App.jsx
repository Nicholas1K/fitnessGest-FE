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
import ActivityWeek from './component/ActivityWeek';

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
        <Route path="/update-addAddressPT" element={<AddAddressPT />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/update-sub/:id" element={<UpdateSubscription />} />
        <Route path="/update-personal-trainer/:id" element={<UpdatePersonaT />} />
        <Route path="/addSubscription" element={<AddSubscription />} />
        <Route path="/activity-week" element={<ActivityWeek />} />
      </Routes>
    </>
  );
}

export default App
