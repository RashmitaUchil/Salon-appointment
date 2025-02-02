import { useNavigate } from 'react-router-dom';
import { useUser } from '../Context/UserContext';
import user from '../img/user.jpg';
import toast from 'react-hot-toast';
import '../Styles/UserCard.css'

function UserCard() {
    const { userId, setUserId, userName, setUserName } = useUser();
    const navigate = useNavigate();

    const handleAuth = () => {
        if (userId) {
            localStorage.removeItem('userId');
            setUserId(null);
            setUserName("User");
            toast.success('Logged out successfully');
            navigate('/');
        } else {
            navigate('/login');
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        navigate("/profile");
    };

    return (
        <div className="text-center">
            <img
                src={user}
                className="mb-3"
                alt={userName}
                style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    border: '2px solid #B76E79'
                }}
            />
            <h5 className="mb-3" style={{ color: '#800080' }}>Hello {userName}!</h5>
            {userId ? (
                <div className="d-grid gap-2">
                    
                    <button
                        onClick={handleClick}
                        className="btn"
                        style={{
                            backgroundColor: '#FF69B4',
                            color: 'white',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            width: '100%'
                        }}
                    >
                        Profile
                    </button>
                    <button
                        onClick={()=>navigate('/app')}
                        className="btn"
                        style={{
                            backgroundColor: '#FF69B4',
                            color: 'white',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            width: '100%'
                        }}
                    >
                        Appointment History
                    </button>

                    <button
                        onClick={handleAuth}
                        className="btn"
                        style={{
                            backgroundColor: '#800080',
                            color: 'white',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            width: '100%',
                            marginBottom: '8px'
                        }}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <button
                    onClick={handleAuth}
                    className="btn"
                    style={{
                        backgroundColor: '#800080',
                        color: 'white',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        width: '100%'
                    }}
                >
                    Login
                </button>
            )}
        </div>
    );
}

export default UserCard;