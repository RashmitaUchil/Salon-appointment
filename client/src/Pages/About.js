import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../Styles/About.css'
function About() {

    const navigate = useNavigate();
    return (
        <div className=" mx-auto p-4"  >
           
            <section className="mb-8">
                <h2 className="text-3xl font-bold text-center mb-4">Welcome to <span className="salon">SALON</span></h2>
                <p className="text-lg text-gray-700">
                    At <span className="salon-small">SALON</span>, we believe that every visit should be a rejuvenating experience. Our talented team of stylists, beauticians, and therapists are dedicated to bringing out your inner glow through personalized beauty services and high-quality treatments.
                </p>
            </section>

            {/* Our Mission */}
            <section className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Our Mission</h3>
                <p className="text-lg text-gray-700">
                    Our mission is simple: to provide every client with an unforgettable beauty experience, tailored to their unique needs. We are committed to using the finest products, the latest techniques, and creating a relaxing atmosphere to ensure that you leave feeling refreshed and beautiful.
                </p>
            </section>

            {/* Our Services */}
            <section className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Our Services</h3>
                <p className="text-lg text-gray-700">
                    At <span className="salon-small">SALON</span>, we offer a wide range of services including:
                </p>
                <ul className="list-disc pl-6 text-gray-700">
                    <li>Haircuts and styling</li>
                    <li>Hair coloring and treatments</li>
                    <li>Manicures and pedicures</li>
                    <li>Bridal and special occasion styling</li>
                </ul>
                <p className="mt-4 text-lg text-gray-700">
                    Whether you're here for a routine touch-up or a complete makeover, our professional team is here to provide you with a customized experience to enhance your beauty and confidence.
                </p>
            </section>

            {/* Our Team */}
            <section className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Meet Our Team</h3>
                <p className="text-lg text-gray-700 mb-4">
                    Meet our team of experts, each with a passion for beauty and a dedication to helping you feel your best. From experienced stylists to certified skincare professionals, our team is here to offer top-tier service and make your salon experience truly special.
                </p>
                <ul className="list-inside text-gray-700">
                    <li>
                        <strong>Lisa</strong> - Master Stylist with over 10 years of experience in hair design and color treatments.
                    </li>
                    <li>
                        <strong>Rose</strong> - Licensed aesthetician specializing in facials, skin treatments, and waxing.
                    </li>
                </ul>
            </section>

            {/* Our Philosophy */}
            <section className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Our Philosophy</h3>
                <p className="text-lg text-gray-700">
                    We believe that beauty is more than skin deep. It's about confidence, self-expression, and taking the time to care for yourself. Our philosophy is centered around creating a welcoming space where everyone feels valued, respected, and pampered.
                </p>
            </section>

            {/* Testimonials */}
            <section className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">What Our Clients Say</h3>
                <blockquote className="italic text-gray-700 mb-4">
                    "I always leave SALON feeling like a new person! The team is so welcoming, and the results are always amazing. I wouldn't trust anyone else with my hair." - <strong>Sarah</strong>
                </blockquote>
            </section>

            {/* Call to Action */}
            <section className="text-center">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Book Your Appointment</h3>
                <p className="text-lg text-gray-700 mb-4">
                    Ready for your next beauty experience? Book an appointment with us today and let us help you look and feel your absolute best.
                </p>
                
                <button onClick={() => navigate('/book')}  className=" btn book-btn container ">
                    Book Now
                    </button>
            
            </section>
        </div>
    )
}


export default About;