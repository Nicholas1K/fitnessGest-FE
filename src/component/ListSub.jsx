import Sub from "./Sub";
import "../style/ListCourse.css";
const ListSub = ({subscriptions, deleteSub}) =>{
    return (
      <table className="tabContainer table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">TYPE</th>
            <th scope="col">MONTH</th>
            <th scope="col">PRICE</th>
            <th scope="col">COMMAND</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((s) => (
            <Sub
              key={s.id}
              id={s.id}
              type={s.type}
              month={s.month}
              price={s.price}
              deleteSub={deleteSub}
            />
          ))}
        </tbody>
      </table>
    );
};
export default ListSub;