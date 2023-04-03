import { useEffect, useState } from "react";
import ListUser from "../component/ListUser";
import Navbar from "../component/Navbar";
import "../style/Coursepage.css";

const UserPage = () =>{
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError]= useState(null);

    async function fetchGetAll(){
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
              "http://localhost:8080/api/user/all"
            );

            if(!response.ok){
                throw new Error("request filed");
            }

            const data = await response.json();
            const trasformData = data.map((us) => {
                return {
                  id: us.id,
                  firstName: us.firstName,
                  lastName: us.lastName,
                  dateOfBirth: us.dateOfBirth,
                  fiscalCode: us.fiscalCode,
                  telephoneNumber: us.telephoneNumber,
                  email: us.email,
                  course: us.courses,
                  subscription: us.subscription,
                };
            });

            setUser(trasformData);
        } catch (error) {
            setError(error.message);
        }

        setIsLoading(false);
    }

    useEffect(()=>{
        fetchGetAll();
    },[]);

    async function fetchDelete(id){
        try {
            const response = await fetch(
              "http://localhost:8080/api/user/delete/" + id,{
                method:"DELETE"
              });
        } catch (error) {
            console.error(error);
        }
        return fetchGetAll()
    }
    let content = <p>found User</p>

    if(user.length == 0){
        content = <p>*** User not found ***</p>
    }
    if(user.length > 0){
        content = <ListUser userList={user} deleteUser={fetchDelete} />;
    }
    if(isLoading){
        content = <p>Loading data...</p>
    }
    if(error){
        content = <p>{error}</p>
    }

    return (
      <>
        <Navbar />
        <div className="contTitle">
          <h1 className="title">Muscle Gest</h1>
          <img
            src="image/Logo.png"
            className="imgclass rounded-circle border border-primary border-opacity-50"
            alt="user"
          />
          <h2>User</h2>
        </div>
        <div className="container">
          <section>{content}</section>
        </div>
      </>
    );
}
export default UserPage;