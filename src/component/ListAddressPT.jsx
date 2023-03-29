import AddressPT from "./AddressPT";

const ListAddressPT = ({ addressPT, deleteAddressPT }) => {
    return (
      <table className="tabContainer table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">NATION</th>
            <th scope="col">REGION</th>
            <th scope="col">CITY</th>
            <th scope="col">PROVINCE</th>
            <th scope="col">POSTAL CODE</th>
            <th scope="col">HOME NUMBER</th>
            <th scope="col">PERSONAL TRAINER</th>
            <th scope="col">COMMAND</th>
          </tr>
        </thead>
        <tbody>
          {addressPT.map((pt) => (
            <AddressPT
              key={pt.id}
              id={pt.id}
              nation={pt.nation}
              region={pt.region}
              city={pt.city}
              province={pt.province}
              postalCode={pt.postalCode}
              homeNumber={pt.homeNumber}
              personalTrainers={pt.personalTrainers}
              deleteAddressPT={deleteAddressPT}
            />
          ))}
        </tbody>
      </table>
    );
};
export default ListAddressPT;