import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import user from "../img/user.jpg";
import toast from "react-hot-toast";
import "../Styles/UserCard.css";

function UserCard() {
  const { userId, setUserId, userName, setUserName } = useUser();
  const navigate = useNavigate();

  const handleAuth = () => {
    if (userId) {
      localStorage.setItem("isLoggingOut", "true");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      setUserId(null);
      setUserName("User");
      toast.dismiss();
      toast.success("Logged out successfully");
      navigate("/");
    } else {
      navigate("/login");
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
      {userId ? (
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
      ) : (
        <button onClick={handleAuth} className="btn">
          Login
        </button>
      )}
    </div>
  );
}

export default UserCard;
