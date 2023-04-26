import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Offer } from '../models/offer';

 
@Injectable({
  providedIn: 'root'
})
export class OfferService {
  baseurloffer: string = environment.basePath;
  constructor(private http: HttpClient) { }
  
  getOffers() {
    return this.http.get<Offer[]>(this.baseurloffer);
  }
  /* metodos filtrar*/
    getKnowledgeId(id: any) {
    return this.http.get<Offer>(`${this. baseurloffer}/${id}`);
  }
/* metodos agregar */
  addoffer(offer: Offer) {
    return this.http.post<Offer>(this. baseurloffer, offer);
  }
/* metodos actulizar */
  updateoffer(id: any, offer: Offer) {
    return this.http.put<Offer>(`${this. baseurloffer}/${id}`, offer);
  }
/* metodos eliminar */
  deleteoffer(id: any) {
    return this.http.delete<Offer>(`${this. baseurloffer}/${id}`);
  }

}