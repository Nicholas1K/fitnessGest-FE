import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import "../style/Coursepage.css";
import ListAddressUser from "../component/ListAddressUser";
import { Link } from "react-router-dom";

const AddressUserPage = () => {
  const [addressUser, setAddressUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchGetAll() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/api/address/all");

      if (!response.ok) {
        throw new Error("request filed");
      }
      const data = await response.json();

      const trasformData = data.map((aUS) => {
        return {
          id: aUS.id,
          nation: aUS.nation,
          region: aUS.region,
          city: aUS.city,
          province: aUS.province,
          postalCode: aUS.postalCode,
          homeNumber: aUS.homeNumber,
          users: aUS.users,
        };
      });

      setAddressUser(trasformData);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    fetchGetAll();
  }, []);

  async function fetchDelete(id) {
    try {
      const response = await fetch(
        "http://localhost:8080/api/address/delete/" + id,
        {
          method: "DELETE",
        }
      );
    } catch (error) {
      console.error(error);
    }
    return fetchGetAll();
  }

  let content = <p>found address</p>;

  if (addressUser.length == 0) {
    content = <p> address not found</p>;
  }
  if (addressUser.length > 0) {
    content = (
      <ListAddressUser
        addressUser={addressUser}
        deleteAddressUser={fetchDelete}
      />
    );
  }
  if (isLoading) {
    content = <p>Loading data...</p>;
  }
  if (error) {
    content = <p>{error}</p>;
  }

  return (
    <>
      <Navbar />
      <div className="contTitle">
        <h1 className="title">Muscle Gest</h1>
        <img
          src="image/Logo.png"
          className="imgclass rounded-circle border border-primary border-opacity-50"
          alt="address users"
        />
        <h2>Addresses Users</h2>
      </div>
      <div className="container">
        <section>{content}</section>
      </div>
      <div className="mt-5">
        <Link className="btnlink" to="/add-address-user">
          Create
        </Link>
      </div>
    </>
  );
};
export default AddressUserPage;
