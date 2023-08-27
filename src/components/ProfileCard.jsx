import "bootstrap/dist/css/bootstrap.min.css";
import { useStateContext } from "../context/ContextProvider";
const ProfileCard = () => {
  const { loggedUser } = useStateContext();
  return (
    <div className="card d-flex align-items-center text-center text-black fs-5 fw-bold">
      <div className="card-body">
        <h1 className="card-title text-uppercase">{loggedUser?.userName}</h1>
        <p className="card-text">Email: {loggedUser?.email}</p>
        <p className="card-text">Mobile Number: {loggedUser?.mobileNumber}</p>
        <p className="card-text">Wallet Balance: {loggedUser?.walletBalance}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
