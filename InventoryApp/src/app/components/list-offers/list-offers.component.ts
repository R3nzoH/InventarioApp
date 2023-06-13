import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Offer } from 'src/app/models/offer';
import { OfferService } from 'src/app/services/offer.service';
@Component({
  selector: 'app-list-offers',
  templateUrl: './list-offers.component.html',
  styleUrls: ['./list-offers.component.css']
})
export class ListOffersComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'points',
    'businessId',
    'url',
    'actions',
  ];
  dataSource = new MatTableDataSource<Offer>();
  Offers!: Offer[];
  limitedUrl!: string[];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  

constructor(private offerService: OfferService,
    private snackBar: MatSnackBar) { }
    ngOnInit(): void {
    this.getOffer();
  }
/*filtroooo */
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
  /*metodo mostrar */
  getOffer() {
    this.offerService.getOffers().subscribe((data: Offer[]) => {
    this.dataSource = new MatTableDataSource(data);
   this.dataSource.paginator = this.paginator;
    });
  }
/*eliminar*/
  deleteOffer(id: number) {
    this.offerService.deleteoffer(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((e: Offer) => {
        return e.id !== id ? e : false;
      });
      this.snackBar.open('El Producto fue eliminado con exito!', '', {
        duration: 6000,
      });
    });
  }
  limitarDescripciones() {
    this.limitedUrl = this.Offers.map(url => url.url.slice(0, 50) + '...'); // Limitar a 50 caracteres y agregar '...' al final
  }
  
  limitarDescripcion(descripcion: string): string {
    if (descripcion.length > 30) {
      return descripcion.slice(0, 30) + '...';
    } else {
      return descripcion;
    }
  }
}
