import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/About.css";
function About() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleText = () => {
    setExpanded(!expanded);
  };

  return (
    <div className=" container mx-auto p-4">
      <section className="mb-8">
        <h2 className="text-3xl font-bold text-center mb-4">
          Welcome to <span className="salon">ZEPHORA</span>
        </h2>
        <p className="text-custom">
          At <span className="salon-small">ZEPHORA</span>, we believe that every
          visit should be a rejuvenating experience. Our talented team of
          stylists, beauticians, and therapists are dedicated to bringing out
          your inner glow through personalized beauty services and high-quality
          treatments.
        </p>
      </section>

      {/* Our Mission */}
      <section className="mb-8">
        <h3 className="heading-text">Our Mission</h3>
        <p className="text-custom">
          Our mission is simple: to provide every client with an unforgettable
          beauty experience, tailored to their unique needs. We are committed to
          using the finest products, the latest techniques, and creating a
          relaxing atmosphere to ensure that you leave feeling refreshed and
          beautiful.
        </p>
      </section>

      {/* Our Services */}
      <div className={`text-custom ${expanded ? "expanded" : "truncated"}`}>
        <h3 className="heading-text">Our Services</h3>
        <p className="text-custom">
          At <span className="salon-small">Zephora</span>, we offer a wide range
          of services including:
        </p>
        <ul className="service-con list-disc pl-6 text-gray-700">
          <li>Haircuts and styling</li>
          <li>Hair coloring and treatments</li>
          <li>Manicures and pedicures</li>
          <li>Bridal and special occasion styling</li>
        </ul>
        {expanded && (
          <p className="text-custom">
            Whether you're here for a routine touch-up or a complete makeover,
            our professional team is here to provide you with a customized
            experience to enhance your beauty and confidence.
          </p>
        )}
      </div>
      <button onClick={toggleText} className="read toggle-btn">
        {expanded ? "Read Less" : "Read More"}
      </button>
      {/* Our Team */}

      {/* Our Philosophy */}
      <section className="mb-8">
        <h3 className="heading-text">Our Philosophy</h3>
        <p className="text-custom">
          We believe that beauty is more than skin deep. It's about confidence,
          self-expression, and taking the time to care for yourself. Our
          philosophy is centered around creating a welcoming space where
          everyone feels valued, respected, and pampered.
        </p>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <h3 className="h3-custom">Book Your Appointment</h3>
        <p className="text-lg text-gray-700 mb-4">
          Ready for your next beauty experience? Book an appointment with us
          today and let us help you look and feel your absolute best.
        </p>

        <button onClick={() => navigate("/book")} className=" home-book-btn">
          Book Now
        </button>
      </section>
    </div>
  );
}

export default About;
