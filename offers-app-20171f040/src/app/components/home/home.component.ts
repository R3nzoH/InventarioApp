import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/models/offer';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  offers!: Offer[];
  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
    this.getOffer();
  }
  getOffer() {
    this.offerService.getOffers().subscribe((data: Offer[]) => {
      this.offers = data;
    });
  }
}
