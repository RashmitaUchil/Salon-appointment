import { Link } from 'react-router-dom';
import user from '../img/user.jpg';
import UserCard from './UserCard';
import '../Styles/Navbar.css'
import { useUser } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom';
function Navbar() {

    const { userId } = useUser();
    const navigate = useNavigate();
    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#F5E2D6' }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={{
                    color: '#B76E79',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '1.8rem'
                }}>
                    SALON
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" style={{ backgroundColor: '#F8BFD0' }}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <br/>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/" style={{ color: '#4C4C4C' }}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/about' style={{ color: '#4C4C4C' }}>About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/book' style={{ color: '#4C4C4C' }}>Book</Link>
                        </li>
                        <li className="nav-item">
                            <div className="dropdown">
                                <button className="btn dropdown-toggle" style={{ color: '#4C4C4C' }} type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    Services
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><Link className="dropdown-item" to='/service/haircut'>Haircut</Link></li>
                                    <li><Link className="dropdown-item" to='/service/haircolor'>Hair Color</Link></li>
                                    <li><Link className="dropdown-item" to='/service/hairstyle'>Hair Styling</Link></li>
                                    <li><Link className="dropdown-item" to='/service/manicure'>Manicure</Link></li>
                                    <li><Link className="dropdown-item" to='/service/pedicure'>Pedicure</Link></li>
                                    <li><Link className="dropdown-item" to='/service/makeup'>Makeup</Link></li>
                                </ul>
                            </div>
                        </li>


                    </ul>
                    {!userId ? <div><button
                        onClick={()=>navigate('/login')}
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
                    </button></div> :
                        <div className="position-relative">
                            <button
                                className="btn p-0 border-0"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ background: 'none' }}
                            >
                                <img
                                    src={user}
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                        cursor: 'pointer',
                                        border: '2px solid #B76E79',
                                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
                                    }}
                                    alt="User"
                                />
                            </button>
                            <div className="dropdown-menu dropdown-menu-end" style={{
                                minWidth: '250px',
                                padding: '1rem',
                                border: 'none',
                                borderRadius: '12px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                marginTop: '0.5rem',
                                backgroundColor: '#fff'
                            }}>
                                <UserCard />
                            </div>
                        </div>}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;