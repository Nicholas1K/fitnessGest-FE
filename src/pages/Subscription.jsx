import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListSub from "../component/ListSub";
import Navbar from "../component/Navbar";
import "../style/Coursepage.css";
import "../style/Home.css";

const Subscription = () =>{

    const [sub, setSub]= useState([]);
    const [isLoading, setIsLoading]= useState(false);
    const [error, setError]= useState(null);

    async function fetchGetAll() {
        setIsLoading(true);
        setError(null);

        try{
            const response = await fetch(
              "http://localhost:8080/api/subscription/all");

              if(!response.ok){
                throw new Error("request filed");
              }
              const data = await response.json();

              const trasformData = data.map((s)=>{
                return {
                  id: s.id,
                  type: s.type,
                  month: s.month,
                  price: s.price,
                };
              });

              setSub(trasformData);
        }catch(error){
            setError(error.message);
        }

        setIsLoading(false);
    };

    async function fetchDelete(id){

        try{
            const response = await fetch("http://localhost:8080/api/subscription/delete/" + id,{
                method: "DELETE",
            });
        }catch(error){
            console.error(error);
        }
        return fetchGetAll();
    };

    useEffect(()=>{
       fetchGetAll(); 
    },[]);

    let content = <p>found subscription list</p>;

    if(sub.length > 0){

        content = <ListSub subscriptions={sub} deleteSub={fetchDelete}/>;
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
        alt="new course"
      />
      <h2>Membership Plans</h2>
    </div>
    <div className="container">
      <section>{content}</section>
    </div>
    <div className="mt-5">
      <Link className="btnlink" to="/addSubscription">
        Create
      </Link>
    </div>
  </>
);
};
export default Subscription;