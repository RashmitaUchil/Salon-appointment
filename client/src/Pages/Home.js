import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../Styles/Home.css";
import hairstyle from "../img/hairstyle.jpg";
import haircut from "../img/haircut.jpg";
import manicure from "../img/manicure.jpg";
import pedicure from "../img/pedicure.jpg";
import haircolor from "../img/hair color.jpg";
import makeup from "../img/makeup.jpg";
import salon1 from "../img/salon1.jpg";
import salon2 from "../img/salon2.jpg";
import salon3 from "../img/salon3.jpg";

function Home() {
  const navigate = useNavigate();

  const services = [
    {
      name: "Haircut",
      img: haircut,
      link: "/service/haircut",
      desc: "Transform your look with a stylish haircut from our professional stylists. Whether you prefer a trendy new style or a classic cut, our experts tailor each service to match your personality and hair type.",
    },
    {
      name: "Makeup & Beauty",
      img: makeup,
      link: "/service/makeup",
      desc: "Enhance your beauty with our professional makeup services. Whether it’s a natural glow or a glamorous evening look, we use top-quality products to make you shine.",
    },
    {
      name: "Hair Styling",
      img: hairstyle,
      link: "/service/hairstyle",
      desc: "Get the perfect hairstyle for any occasion with our expert hair styling services. From elegant updos to voluminous curls, we craft the look that suits your personality and event.",
    },
    {
      name: "Manicure",
      img: manicure,
      link: "/service/manicure",
      desc: "Give your hands  the care they deserve with our luxurious manicure services. Enjoy relaxing treatments that leave your nails perfectly shaped and polished",
    },
    {
      name: "Hair Color",
      img: haircolor,
      link: "/service/haircolor",
      desc: "Transform your look with professional hair coloring services. Whether you want a subtle change or a bold new shade, our experts use high-quality products to ensure vibrant, long-lasting color.",
    },
    {
      name: "Pedicure",
      img: pedicure,
      link: "/service/pedicure",
      desc: "Pamper your feet with our relaxing pedicure treatments. Our services ensure soft, smooth skin, healthy nails, and a perfect polish finish for a clean and stylish look.",
    },
  ];
  return (
    <div className="home-container">
      {/* Carousel Section */}
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={salon1}
              className="carousel-image"
              alt="Salon 1"
              loading="lazy"
            />
            <div className="carousel-caption d-none d-md-block">
              <h3>Experience professional service</h3>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src={salon2}
              className="carousel-image"
              alt="Salon 2"
              loading="lazy"
            />
            <div className="carousel-caption d-none d-md-block">
              <h3>Give yourself a makeover</h3>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src={salon3}
              className="carousel-image"
              alt="Salon 3"
              loading="lazy"
            />
            <div className="carousel-caption d-none d-md-block">
              <h3>Book your appointment now</h3>
              <Link className="text-black" to="/book">
                click here to book
              </Link>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Services Section */}
      <div className="container-xl con-service">
        <h2 className="section-title">Our Services</h2>

        <div className="services-container">
          {services.map((service, index) => (
            <motion.div
              className="service-card"
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -150 : 150 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: { duration: 1 },
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Link to={service.link} key={index} className="service-link">
                <div className="service-content">
                  <div className="service-text">
                    <h3>{service.name}</h3>
                    <p>{service.desc}</p>
                  </div>
                  <img
                    src={service.img}
                    alt={service.name}
                    className="service-img"
                    loading="lazy"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <button onClick={() => navigate("/book")} className="home-book-btn">
          Book Your Professional Appointment Now!
        </button>
      </div>
    </div>
  );
}

export default Home;
