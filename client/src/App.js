import './App.css';
import Navbar from './Components/Navbar';
import { UserProvider } from './Context/UserContext'; // Make sure you are importing UserProvider correctly
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Home from './Pages/Home';
import Book from './Pages/Book';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ShowApp from './Pages/ShowAppointment';
import { Toaster } from 'react-hot-toast';
import Profile from './Pages/Profile';
import Footer from './Components/Footer';
import ServicePage from './Pages/ServicePage';
import About from './Pages/About'

function App() {
    return (
        <Router>

            <UserProvider> 
                <Navbar />
             
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/book" element={<Book />} />
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/app" element={<ShowApp />} />
                    <Route path="/service/:name" element={<ServicePage />} />
                </Routes>
                <Footer />
                <Toaster />
            </UserProvider>
        </Router>
    );
}

export default App;
