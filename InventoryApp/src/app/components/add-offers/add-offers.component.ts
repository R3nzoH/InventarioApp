import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Offer } from 'src/app/models/offer';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-add-offers',
  templateUrl: './add-offers.component.html',
  styleUrls: ['./add-offers.component.css']
})
export class AddOffersComponent implements OnInit {
  myForm: any;  
  constructor(private fb: FormBuilder,
    private offerService: OfferService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.reactiveForm();
  }
  reactiveForm() {
    this.myForm = this.fb.group({
      id: [''],
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required,Validators.minLength(10)]],
      points: ['', [Validators.required,Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]],
      businessId: ['', [Validators.required,Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]],
      url: ['', [Validators.required,Validators.pattern('^(https?://)?([\\w-]+\\.)+[\\w-]+(/[\\w-./?%&=]*)?$')]],
    });
  }
saveoffer(): void {
    const offer: Offer = {
      id: 0,
      title: this.myForm.get('title')!.value,
      description: this.myForm.get('description')!.value,
      points: this.myForm.get('points')!.value,
      businessId: this.myForm.get('businessId')!.value,
      url: this.myForm.get('url')!.value,
    };
    this.offerService.addoffer(offer).subscribe({
      next: (data) => {
        this.snackBar.open('El Producto fue registrado con exito!', '', {
          duration: 6000,
        });
        this.router.navigate(['/business/offers']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
