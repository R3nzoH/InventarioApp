import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Offer } from 'src/app/models/offer';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-edit-offers',
  templateUrl: './edit-offers.component.html',
  styleUrls: ['./edit-offers.component.css']
})
export class EditOffersComponent implements OnInit {
  myForm!: FormGroup;
  offer!: Offer;
  idoffer: any;
 constructor(
    private fb: FormBuilder,
    private offerService: OfferService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadOffer();
  }
  loadOffer() {
    this.idoffer= this.route.snapshot.paramMap.get('id');
    this.offerService.getKnowledgeId(this.idoffer).subscribe((data) => {
      this.offer = data;
      this.myForm = this.fb.group({
        id: this.idoffer,
        title: [
          this.offer.title,
          [Validators.required, Validators.minLength(10)],
        ],
        description: [this.offer.description, [Validators.required,Validators.minLength(10)]],
        points: [this.offer.points, [Validators.required,Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]],
        businessId: [this.offer.businessId,[Validators.required,Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]],
        url: [this.offer.url,[Validators.required,Validators.pattern('^(https?://)?([\\w-]+\\.)+[\\w-]+(/[\\w-./?%&=]*)?$')]],
      });
    });
  }


  /*actualizar */
updateOffer(): void {
    const offer: Offer = {
      id: this.idoffer,
      title: this.myForm.get('title')!.value,
      description: this.myForm.get('description')!.value,
      points: this.myForm.get('points')!.value,
      businessId: this.myForm.get('businessId')!.value,
      url: this.myForm.get('url')!.value
    };
    this.offerService
      .updateoffer(this.idoffer, offer)
      .subscribe({
        next: (data) => {
          this.snackBar.open('El producto fue actualizado con exito!', '', {
            duration: 6000,
          });
          this.router.navigate(['business/offers']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

}
