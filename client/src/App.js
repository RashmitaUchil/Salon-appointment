import "./App.css";
import Navbar from "./Components/Navbar";
import { UserProvider } from "./Context/UserContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./Pages/Home";
import Book from "./Pages/Book";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ShowApp from "./Pages/ShowAppointment";
import { Toaster } from "react-hot-toast";
import Profile from "./Pages/Profile";
import Footer from "./Components/Footer";
import ServicePage from "./Pages/ServicePage";
import About from "./Pages/About";
import { ToastContainer } from "react-toastify";
import Dashboard from "./Pages/Dashboard";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function Layout() {
  useEffect(() => {
    document.body.style.overflow = "hidden"; // This will remove both scrollbars
  }, []);
  const location = useLocation(); // Now this is inside the Router context

  return (
    <>
      {/* Conditionally render Navbar and Footer based on route */}
      {location.pathname !== "/dashboard" && <Navbar />}

      <ToastContainer />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Book />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/app" element={<ShowApp />} />
        <Route path="/service/:name" element={<ServicePage />} />
      </Routes>

      {!["/dashboard", "/app"].includes(location.pathname) && <Footer />}

      <Toaster />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <UserProvider>
          <Layout />
        </UserProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
