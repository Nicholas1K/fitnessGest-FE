import { useEffect, useRef, useState } from "react";
import Navbar from "../component/Navbar";
import "../style/Coursepage.css";
import "../style/AddCourse.css";

const AddCourse = ()=>{

    const [nomeCorso, setNomeCorso] = useState("");
    const [controlloNome, setControlloNome] = useState("");
    const [abilitaBtn, setAbilitaBtn]= useState(true);

    const nomeCorsoRef = useRef ("");

    const verificaNome = (e) => {
        const nSelezionato = e.target.value;
        setNomeCorso(nSelezionato);

        if(/^[a-z]{3,}$/.test(nSelezionato)){
            setControlloNome(true);
        }else{
            setControlloNome(false);
        }
    };

    useEffect(()=>{
        if (controlloNome){
            setAbilitaBtn(false);
        }else{
            setAbilitaBtn(true);
        }
    },[controlloNome]);

    function submitHandler(event){
        event.preventDefault();

        console.log("dati inviati correttamente");

        const corso = {
          name: nomeCorsoRef.current.value,
        };

        fetch("http://localhost:8080/api/course/create",{
            method:"POST",
            body: JSON.stringify(corso),
            headers:{"Content-Type":"application/json"},
        });
    }

    function returnHandleClick(){
      window.location.reload();
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
          <h2 className="text-center">Course Create</h2>
          <div className="boxTable row">
            <div className="col-sm-1 col-md-5 container justify-content-center">
              <div className="">
                <form onSubmit={submitHandler} className="row g-3">
                  <div>
                    <label htmlFor="inputCorso" className="form-label">
                      Nome Corso
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={nomeCorso}
                      onChange={verificaNome}
                      ref={nomeCorsoRef}
                    />
                    {nomeCorso.length > 1 && !controlloNome && (
                      <span className="text-danger">nome errato</span>
                    )}
                  </div>
                  <div className="box-footer">
                    <button
                      type="submit"
                      className="save mt-2"
                      disabled={abilitaBtn}
                      onClick={returnHandleClick}
                    >
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
}
export default AddCourse;