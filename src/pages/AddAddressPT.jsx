import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar"

const AddAddressPT = ()=>{

    //settaggio
    const [personalTrainers, setPersonalTrainers]= useState([]);

    //invio dati
    const nationRef = useRef("");
    const regionRef = useRef("");
    const cityRef = useRef("");
    const provinceRef = useRef("");
    const postalCodeRef = useRef("");
    const homeNumberRef = useRef("");
    const [selectedPT, setSelectedPT] = useState([]);

    //redirect
    const navigate = useNavigate();

    async function fetchGetAllPT(){
        try{
            const responsePT = await fetch("http://localhost:8080/api/personalTrainer/all");

            const data = await responsePT.json();

            const trasformPT = data.map((pt)=>{
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
            console.log(trasformPT);

            setPersonalTrainers(trasformPT);
        }catch(error){
            throw new Error("request filed");
        }
    }
    useEffect(()=>{
        fetchGetAllPT()
    },[]);

    function submitHandler(event){
        event.preventDefault();

        console.log("dati inviati");

        const AddressPT = {
          nation: nationRef.current.value,
          region: regionRef.current.value,
          city: cityRef.current.value,
          province: provinceRef.current.value,
          postalCode: postalCodeRef.current.value,
          homeNumber: homeNumberRef.current.value,
          personalTrainers: selectedPT,
        };

        fetch("http://localhost:8080/api/addressPersonalT/create", {
          method: "POST",
          body: JSON.stringify(AddressPT),
          headers: { "Content-Type": "application/json" },
        }).then(()=> navigate("/"));
    }

    return (
      <>
        <Navbar />
        <div className="contTitle container">
          <h1 className="title text-center">Muscle Gest</h1>
          <img
            src="image/Logo.png"
            className="imgclass rounded-circle border border-primary border-opacity-50"
            alt="new course"
          />
          <h2 className="text-center">Address Personal Trainer Create</h2>
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
                      placeholder="nation"
                      name="nation"
                      ref={nationRef}
                    />
                  </div>
                  <div>
                    <label htmlFor="inputPT" className="form-label">
                      Region
                    </label>
                    <input
                      type="text"
                      placeholder="region"
                      name="region"
                      ref={regionRef}
                    />
                  </div>
                  <div>
                    <label htmlFor="inputPT" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="city"
                      name="city"
                      ref={cityRef}
                    />
                  </div>
                  <div>
                    <label htmlFor="inputPT" className="form-label">
                      Province
                    </label>
                    <input
                      type="text"
                      placeholder="province"
                      name="province"
                      ref={provinceRef}
                    />
                  </div>
                  <div>
                    <label htmlFor="inputPT" className="form-label">
                      PostalCode
                    </label>
                    <input
                      type="text"
                      placeholder="postalCode"
                      name="postalCode"
                      ref={postalCodeRef}
                    />
                  </div>
                  <div>
                    <label htmlFor="inputPT" className="form-label">
                      HomeNumber
                    </label>
                    <input
                      type="text"
                      placeholder="homeNumber"
                      name="homeNumber"
                      ref={homeNumberRef}
                    />
                  </div>
                  <div>
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
                        setSelectedPT(values);
                      }}
                    >
                        <option value="select pt">Personal Trainer</option>
                      {personalTrainers.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.id} : {p.lastName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="box-footer">
                    <button type="submit" className="save mt-2">
                      SAVE
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};
export default AddAddressPT;