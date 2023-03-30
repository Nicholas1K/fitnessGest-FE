import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../component/Navbar"

const UpdateAddressUser = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const [addressUs, setAddressUs] = useState(null);
    
    const [selectedUser, setSelectedUser] = useState([]);
    const [user, setUser] = useState([]);

    async function fetchGetAllUser(){
        try {
            const response = await fetch(
              "http://localhost:8080/api/user/all"
            );

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
            throw new Error("request filed");
        }
    }
    useEffect(()=>{
        fetchGetAllUser();
    },[]);

    const fetchGetId = async(id) => {
        return fetch("http://localhost:8080/api/address/find/" + id);
    };

    useEffect(()=>{
        fetchGetId(id).then((res)=>{
            return res.json();
        }).then((data)=>{
            if(data){
                console.log(data);
                setAddressUs(data);
            }
        });
    },[id]);

    function changeNation(e){
        const {name, value} = e.target;
        setAddressUs({...addressUs,[name]:value});
    }
    function changeRegion(e) {
      const { name, value } = e.target;
      setAddressUs({ ...addressUs, [name]: value });
    }
    function changeCity(e) {
      const { name, value } = e.target;
      setAddressUs({ ...addressUs, [name]: value });
    }
    function changeProvince(e) {
      const { name, value } = e.target;
      setAddressUs({ ...addressUs, [name]: value });
    }
    function changePostalCode(e) {
      const { name, value } = e.target;
      setAddressUs({ ...addressUs, [name]: value });
    }
    function changeHomeNumber(e) {
      const { name, value } = e.target;
      setAddressUs({ ...addressUs, [name]: value });
    }

    async function fetchPut(addressUser) {
      const response = await fetch(
        "http://localhost:8080/api/address/update/" + addressUser.id,
        {
          method: "PUT",
          body: JSON.stringify(addressUser),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        console.error("request filed");
      } else {
        navigate("/");
      }
    };

    function submitHandler(e) {
      e.preventDefault();
      fetchPut(addressUs);
      console.log(addressUs);
    }
    if (addressUs == null){
        return <h3 className="text-danger">*** Addresses personal trainers not found ***</h3>;
    };

      return (
        <>
          <Navbar />
          <div className="contTitle container">
            <h1 className="title text-center">Muscle Gest</h1>
            <img
              src="../image/Logo.png"
              className="imgclass rounded-circle border border-primary border-opacity-50"
              alt="new course"
            />
            <h2 className="text-center">Address Personal Trainer Update</h2>
            <div className="boxTable row">
              <div className="col-sm-1 col-md-5 container justify-content-center">
                <div className="container">
                  <form onSubmit={submitHandler} className="row g-3">
                    <div>
                      <label htmlFor="inputPT" className="form-label">
                        Nation
                      </label>
                      <input
                        type="text"
                        placeholder="insert nation"
                        name="nation"
                        value={addressUs.nation}
                        onChange={changeNation}
                      />
                    </div>
                    <div>
                      <label htmlFor="inputPT" className="form-label">
                        Region
                      </label>
                      <input
                        type="text"
                        placeholder="insert region"
                        name="region"
                        value={addressUs.region}
                        onChange={changeRegion}
                      />
                    </div>
                    <div>
                      <label htmlFor="inputPT" className="form-label">
                        City
                      </label>
                      <input
                        type="text"
                        placeholder="insert city"
                        name="city"
                        value={addressUs.city}
                        onChange={changeCity}
                      />
                    </div>
                    <div>
                      <label htmlFor="inputPT" className="form-label">
                        Province
                      </label>
                      <input
                        type="text"
                        placeholder="insert province"
                        name="province"
                        value={addressUs.province}
                        onChange={changeProvince}
                      />
                    </div>
                    <div>
                      <label htmlFor="inputPT" className="form-label">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        placeholder="insert postalCode"
                        name="postalCode"
                        value={addressUs.postalCode}
                        onChange={changePostalCode}
                      />
                    </div>
                    <div>
                      <label htmlFor="inputPT" className="form-label">
                        Home Number
                      </label>
                      <input
                        type="text"
                        placeholder="insert homeNumber"
                        name="homeNumber"
                        value={addressUs.homeNumber}
                        onChange={changeHomeNumber}
                      />
                    </div>
                    <div>
                      <label htmlFor="inputPT" className="form-label">
                        User
                      </label>
                      <select
                        multiple
                        onChange={(e) => {
                          const option = e.target.options;
                          const values = [];
                          for (let i = 0; i < option.length; i++) {
                            if (option[i].selected) {
                              values.push({ id: parseInt(option[i].value) });
                            }
                          }
                          setSelectedUser(values);
                          setAddressUs({ ...addressUs,user:values,}); // con questa riga di codice sto settando per fare l'update
                        }}
                      >
                        {user.map((pt) => (
                          <option key={pt.id} value={pt.id}>
                            {pt.id} : {pt.lastName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="box-footer">
                      <button type="submit" className="save mt-2">
                        UPDATE
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      );
}
export default UpdateAddressUser;