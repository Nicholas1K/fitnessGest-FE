import { useRef } from "react";
import Navbar from "../component/Navbar";

const AddSubscription = () => {

    const typeRef = useRef("");
    const monthRef = useRef("");
    const priceRef = useRef("");

    function submitHandler(event){
        event.preventDefault();

        console.log("dati inviati");

        const subscription = {
          type: typeRef.current.value,
          month: monthRef.current.value,
          price: priceRef.current.value,
        };

        fetch("http://localhost:8080/api/subscription/create", {
          method: "POST",
          body: JSON.stringify(subscription),
          headers: { "Content-Type": "application/json" },
        });
    }

    function reloadHandledClick(){
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
      <h2 className="text-center">Membership Create</h2>
      <div className="boxTable row">
        <div className="col-sm-1 col-md-5 container justify-content-center">
          <div className="">
            <form onSubmit={submitHandler} className="row g-3">
              <div>
                <label htmlFor="inputCorso" className="form-label">
                  Tipo
                </label>
                <input type="text" name="type" ref={typeRef} />
              </div>
              <div>
                <label htmlFor="inputCorso" className="form-label">
                  Mese
                </label>
                <input type="text" name="month" ref={monthRef} />
              </div>
              <div>
                <label htmlFor="inputCorso" className="form-label">
                  Prezzo
                </label>
                <input type="text" name="price" ref={priceRef} />
              </div>
              <div className="box-footer">
                <button
                  type="submit"
                  className="save mt-2"
                  onClick={reloadHandledClick}
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
export default AddSubscription;