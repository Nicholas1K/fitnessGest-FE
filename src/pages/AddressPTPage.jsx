import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import "../style/Coursepage.css";
import ListAddressPT from "../component/ListAddressPT"
import { Link } from "react-router-dom";

const AddressPTPage = () => {
  const [addressPersonalT, setAddressPersonalT] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchGetAll() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:8080/api/addressPersonalT/all"
      );

      if (!response.ok) {
        throw new Error("request filed");
      }
      const data = await response.json();
      
      const trasformData = data.map((aPT) => {
        return {
          id: aPT.id,
          nation: aPT.nation,
          region: aPT.region,
          city: aPT.city,
          province: aPT.province,
          postalCode: aPT.postalCode,
          homeNumber: aPT.homeNumber,
          personalTrainers: aPT.personalTrainers,
        };
      });

      setAddressPersonalT(trasformData);
    } catch (error) {
        setError(error.message);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    fetchGetAll()
  },[]);

  async function fetchDelete(id){
    try {
      const response = await fetch(
        "http://localhost:8080/api/addressPersonalT/delete/" + id,{
          method:"DELETE"
        });
    } catch (error) {
      console.error(error);
    }
    return fetchGetAll();
  };

  let content = <p>found address</p>

  if (addressPersonalT.length == 0){
    content = <p> address not found</p>
  }
  if (addressPersonalT.length > 0){
    content = <ListAddressPT addressPT={addressPersonalT} deleteAddressPT={fetchDelete} />;
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
            alt="address personalTrainer"
          />
          <h2>Address Personal Trainer</h2>
        </div>
        <div className="container">
          <section>{content}</section>
        </div>
        <div className="mt-5">
          <Link className="btnlink" to="/add-AddressPT">
            Create
          </Link>
        </div>
      </>
    );
};
export default AddressPTPage;
