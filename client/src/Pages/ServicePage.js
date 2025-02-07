import React from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/ServicePage.css';
import hairstyle from '../img/hairstyle-service.jpg'
import haircut from '../img/haircut-service.jpg'
import manicure from '../img/manicure-service.jpg'
import pedicure from '../img/pedicure-service.jpg'
import haircolor from '../img/haircolor-service.jpg'
import makeup from '../img/makeup-service.jpg'
import {Link } from 'react-router-dom'

const serviceDetails = {
    haircut: {
        image: haircut,
        description: 'Get a stylish haircut from professional stylists, offering a variety of styles tailored to your preferences.'
    },
    makeup: {
        image: makeup,
        description: 'Enhance your beauty with our professional makeup services, whether for a special occasion or everyday glam.'
    },
    hairstyle: {
        image: hairstyle,
        description: 'Get a beautiful hairstyle crafted by our experts, whether it’s a simple updo or something more intricate.'
    },
    manicure: {
        image: manicure,
        description: 'Beautify your nails with a professional manicure. Choose from a variety of styles and colors.'
    },
    haircolor: {
        image: haircolor,
        description: 'Transform your hair with a beautiful color treatment, using the highest quality hair dyes.'
    },
    pedicure: {
        image: pedicure,
        description: 'Treat your feet to a soothing pedicure, with moisturizing treatments and a polish of your choice.'
    }
};

function ServicePage() {
    const { name } = useParams();
    const service = serviceDetails[name];

    return (
        <div className="service-page-container">
            <h2>{name.charAt(0).toUpperCase() + name.slice(1)} Service</h2>
            <img src={service.image} alt={name} className="service-detail-img" />
            <p>{service.description}</p>
            <Link to="/book" className="service-book-btn">Book Your {name} Appointment Now!</Link>
        </div>
    );
}

export default ServicePage;
