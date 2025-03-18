import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { DetailService } from '../../Models/service.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent implements OnInit {
  serviceName: string = '';
  service: DetailService | undefined;

  serviceDetails: { [key: string]: DetailService } = {
    haircut: {
      image: '/assets/img/haircut-service.jpg',
      description:
        'Get a stylish haircut from professional stylists, offering a variety of styles tailored to your preferences.',
    },
    makeup: {
      image: '/assets/img/makeup-service.jpg',
      description:
        'Enhance your beauty with our professional makeup services, whether for a special occasion or everyday glam.',
    },
    hairstyle: {
      image: '/assets/img/hairstyle-service.jpg',
      description:
        'Get a beautiful hairstyle crafted by our experts, whether its a simple updo or something more intricate.',
    },
    manicure: {
      image: '/assets/img/manicure-service.jpg',
      description:
        'Beautify your nails with a professional manicure. Choose from a variety of styles and colors.',
    },
    haircolor: {
      image: '/assets/img/haircolor-service.jpg',
      description:
        'Transform your hair with a beautiful color treatment, using the highest quality hair dyes.',
    },
    pedicure: {
      image: '/assets/img/pedicure-service.jpg',
      description:
        'Treat your feet to a soothing pedicure, with moisturizing treatments and a polish of your choice.',
    },
  };

  constructor(private route: ActivatedRoute, public router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.serviceName = params['name'];
      this.service =
        this.serviceDetails[
          this.serviceName as keyof typeof this.serviceDetails
        ];
    });
  }
}
