import { Component, OnInit } from '@angular/core';
import { SalonService } from '../../Models/service.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserServiceInfo } from '../../Service/UserService';
@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  services: SalonService[] = [
    {
      name: 'Haircut',
      img: '/assets/img/haircut.jpg',
      link: '/service/haircut',
      desc: 'Transform your look with a stylish haircut from our professional stylists. Whether you prefer a trendy new style or a classic cut, our experts tailor each service to match your personality and hair type.',
    },
    {
      name: 'Makeup & Beauty',
      img: '/assets/img/makeup.jpg',
      link: '/service/makeup',
      desc: 'Enhance your beauty with our professional makeup services. Whether it’s a natural glow or a glamorous evening look, we use top-quality products to make you shine.',
    },
    {
      name: 'Hair Styling',
      img: '/assets/img/hairstyle.jpg',
      link: '/service/hairstyle',
      desc: 'Get the perfect hairstyle for any occasion with our expert hair styling services. From elegant updos to voluminous curls, we craft the look that suits your personality and event.',
    },
    {
      name: 'Manicure',
      img: '/assets/img/manicures.jpg',
      link: '/service/manicure',
      desc: 'Give your hands  the care they deserve with our luxurious manicure services. Enjoy relaxing treatments that leave your nails perfectly shaped and polished',
    },
    {
      name: 'Hair Color',
      img: '/assets/img/hair color.jpg',
      link: '/service/haircolor',
      desc: 'Transform your look with professional hair coloring services. Whether you want a subtle change or a bold new shade, our experts use high-quality products to ensure vibrant, long-lasting color.',
    },
    {
      name: 'Pedicure',
      img: '/assets/img/pedicure.jpg',
      link: '/service/pedicure',
      desc: 'Pamper your feet with our relaxing pedicure treatments. Our services ensure soft, smooth skin, healthy nails, and a perfect polish finish for a clean and stylish look.',
    },
  ];
  constructor(public router: Router, private userInfo: UserServiceInfo) {}
  navigateToBook() {
    this.router.navigate(['book']);
  }
  ngOnInit(): void {}
}
