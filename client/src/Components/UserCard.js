import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import user from "../img/user.jpg";
import toast from "react-hot-toast";
import "../Styles/UserCard.css";

function UserCard() {
  const { userId, setUserId, userName, setUserName, setIsLoggingOut } =
    useUser();

  const navigate = useNavigate();

  const handleAuth = () => {
    if (userId) {
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");

      setUserId(null);
      setUserName("User");
      setIsLoggingOut(true);

      toast.dismiss();
      toast.success("Logged out successfully");

      navigate("/");
      setTimeout(() => setIsLoggingOut(false));
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/profile");
  };

  return (
    <div className="text-center">
      <img src={user} className="user-img mb-3" alt={userName} />
      <h5 className="mb-3 text-pink-600">Hello {userName}!</h5>

      <div className="d-grid gap-2">
        <button onClick={handleClick} className="btn-opt">
          Profile
        </button>
        <button onClick={() => navigate("/app")} className="btn-opt">
          Appointment History
        </button>

        <button onClick={handleAuth} className="btn-out">
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserCard;
