import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TempStorageService } from 'src/app/services/temp-storage/temp-storage.service';
import { CommunicationService } from 'src/app/services/communication/communication.service';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  productDetail: any;
  userDetails: any;
  constructor(public router: Router, private storage: TempStorageService, private communication: CommunicationService, private http: HttpRequestService) {
    this.getProductData();
  }

  ngOnInit(): void {
    this.communication.updateProduct.subscribe((response) => {
      this.getProductData();
    });
  }

  loggedIn() {
    this.userDetails = this.storage.getStorage();
    return this.storage.getStorage();
  }

  getProductData() {
    this.productDetail = this.storage.getProductStorage();
  }

  total() {
    return (this.productDetail.quantity * this.productDetail.product.price).toFixed(2);
  }

  removeItem() {
    this.storage.clearProductStorage();
    this.productDetail = null;
    this.router.navigate(['/home']);
  }

  logout() {
    this.removeItem();
    this.storage.clearStorage();
    this.router.navigate(['/home']);
  }

}
