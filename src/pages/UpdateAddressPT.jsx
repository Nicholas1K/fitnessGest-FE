import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../component/Navbar"

const UpdateAddressPT = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const [addressPT, setAddressPT] = useState(null);
    
    const [selectedPersonalT, setSelectedPersonalT] = useState([]);
    const [personalTrainers, setPersonalTrainers] = useState([]);

    async function fetchGetAllPersonalT(){
        try {
            const response = await fetch(
              "http://localhost:8080/api/personalTrainer/all"
            );

            const data = await response.json();

            const trasformData = data.map((pt) => {
                return {
                  id: pt.id,
                  firstName: pt.firstName,
                  lastName: pt.lastName,
                  dateOfBirth: pt.dateOfBirth,
                  workStart: pt.workStart,
                  fiscalCode: pt.fiscalCode,
                  telephoneNumber: pt.telephoneNumber,
                  email: pt.email,
                  courses: pt.courses,
                };
            });

            setPersonalTrainers(trasformData);
        } catch (error) {
            throw new Error("request filed");
        }
    }
    useEffect(()=>{
        fetchGetAllPersonalT();
    },[]);

    const fetchGetId = async(id) => {
        return fetch("http://localhost:8080/api/addressPersonalT/find/" + id);
    };

    useEffect(()=>{
        fetchGetId(id).then((res)=>{
            return res.json();
        }).then((data)=>{
            if(data){
                console.log(data);
                setAddressPT(data);
            }
        });
    },[id]);

    function changeNation(e){
        const {name, value} = e.target;
        setAddressPT({...addressPT,[name]:value});
    }
    function changeRegion(e) {
      const { name, value } = e.target;
      setAddressPT({ ...addressPT, [name]: value });
    }
    function changeCity(e) {
      const { name, value } = e.target;
      setAddressPT({ ...addressPT, [name]: value });
    }
    function changeProvince(e) {
      const { name, value } = e.target;
      setAddressPT({ ...addressPT, [name]: value });
    }
    function changePostalCode(e) {
      const { name, value } = e.target;
      setAddressPT({ ...addressPT, [name]: value });
    }
    function changeHomeNumber(e) {
      const { name, value } = e.target;
      setAddressPT({ ...addressPT, [name]: value });
    }

    async function fetchPut(addressPersonalT) {
      const response = await fetch(
        "http://localhost:8080/api/addressPersonalT/update/" + addressPersonalT.id,
        {
          method: "PUT",
          body: JSON.stringify(addressPersonalT),
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
      fetchPut(addressPT);
      console.log(addressPT);
    }
    if (addressPT == null){
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
                        value={addressPT.nation}
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
                        value={addressPT.region}
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
                        value={addressPT.city}
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
                        value={addressPT.province}
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
                        value={addressPT.postalCode}
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
                        value={addressPT.homeNumber}
                        onChange={changeHomeNumber}
                      />
                    </div>
                    <div>
                      <label htmlFor="inputPT" className="form-label">
                        Personal Trainers
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
                          setSelectedPersonalT(values);
                          setAddressPT({ ...addressPT,personalTrainers:values,}); // con questa riga di codice sto settando per fare l'update
                        }}
                      >
                        {personalTrainers.map((pt) => (
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
export default UpdateAddressPT;