import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Home.css";
import hairstyle from '../img/hairstyle.jpg'
import haircut from '../img/haircut.jpg'
import manicure from '../img/manicure.jpg'
import pedicure from '../img/pedicure.jpg'
import haircolor from '../img/hair color.jpg'
import makeup from '../img/makeup.jpg'
import salon1 from '../img/salon1.jpg'
import salon2 from '../img/salon2.jpg'
import salon3 from '../img/salon3.jpg'

function Home() {
    return (
        <div className="home-container">
            {/* Carousel Section */}
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">

                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={salon1} className="carousel-image" alt="Salon Interior 1" loading="lazy" />
                        <div className="carousel-caption d-none d-md-block">
                            <h3>Experience professional service</h3>
                            
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={salon2} className="carousel-image" alt="Salon Interior 2" loading="lazy" />
                        <div className="carousel-caption d-none d-md-block ">
                            <h3>Give yourself a makeover</h3>
                            
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={salon3} className="carousel-image" alt="Salon Interior 3" loading="lazy" />
                        <div className="carousel-caption d-none d-md-block" >
                            <h3>Book your appointment now</h3>
                            <Link style={{ color: 'black', textDecoration: 'none' }} to='/book'>click here to book</Link>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            {/*--------------------------------------------------------------*/}
            {/* Services Section */}

            <div className="container-xl " style={{ width: '100%'} }>

                <h2 className="section-title">Our Services</h2>

                <div className="services-container">
                    <div className="service-card">
                        <Link to="/service/haircut">
                            <img src={haircut} alt="Haircut" className="service-img" loading="lazy" />
                        </Link>
                        <h3>Haircut</h3>
                            <p>Get a stylish haircut from professional stylists.</p>
                    
                    </div>

                    <div className="service-card">
                        <Link to="/service/makeup">
                            <img src={makeup} alt="Makeup" className="service-img" loading="lazy" />
                        </Link>
                        <h3>Makeup & Beauty</h3>
                            <p>Enhance your beauty with our professional makeup services.</p>
                       
                    </div>

                    <div className="service-card">
                        <Link to="/service/hairstyle">
                            <img src={hairstyle} alt="Hair Styling" className="service-img" loading="lazy" />
                        </Link>
                        <h3>Hair Styling</h3>
                        <p>Enhance your beauty with our professional hair stylists.</p>
                    
                    </div>

                    <div className="service-card">
                    <Link to="/service/manicure">
                            <img src={manicure} alt="Manicure" className="service-img" loading="lazy" />
                        </Link>
                        <h3>Manicure</h3>
                    <p>Beautify your nails with our professional manicure service.</p>
                        
                    </div>

                    <div className="service-card">
                        <Link to="/service/haircolor">
                            <img src={haircolor} alt="Hair Color" className="service-img" loading="lazy" />
                        </Link>
                            <h3>Hair Color</h3>
                        
                        <p>Give your hair an amazing color with our professional services.</p>
                     
                    </div>

                    <div className="service-card">
                        <Link to="/service/pedicure">
                            <img src={pedicure} alt="Pedicure" className="service-img" loading="lazy" />
                        </Link>
                        <h3>Pedicure</h3>
                        <p>Beautify your toes with our professional pedicure service.</p>
                       
                    </div>
                </div>

                <Link to="/book" className="home-book-btn">Book Your Professional Appointment Now!</Link>
            </div>
        </div>
    );
}

export default Home;
