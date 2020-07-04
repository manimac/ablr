import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';
import { ToastrService } from 'ngx-toastr';
import { TempStorageService } from 'src/app/services/temp-storage/temp-storage.service';
import { Router } from '@angular/router';
import { CommunicationService } from 'src/app/services/communication/communication.service';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {

  currentProduct: any = {};
  quantity: any = '';
  currentImage: any;

  constructor(public router: Router, private http: HttpRequestService, private toast: ToastrService, private storage: TempStorageService, private communication: CommunicationService) {
    this.loadProducts();
  }

  ngOnInit(): void {
  }

  loadProducts() {
    this.http.get("/product/get").subscribe(
      (response: any) => {
        if (response && response.length > 0) {
          this.currentProduct = response[0];
          let str = this.currentProduct.image.split(",");
          this.currentProduct.products = str;
          this.currentImage = this.currentProduct.products[0];
        }
        else {
          this.toast.error("No products found");
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  buynow() {
    if (!this.quantity) {
      this.toast.error("Please select the quantity");
      return;
    }
    let params = {
      product: this.currentProduct,
      quantity: parseInt(this.quantity)
    }
    this.storage.setProductStorage(params);
    this.communication.updateProduct.emit();
    this.router.navigate(['/checkout']);
    // if(this.storage.getStorage()){
    //   let user = this.storage.getStorage();
    //   let params = {
    //     user_id: user.id,
    //     product_id: this.currentProduct.id,  
    //     quantity: currentProduct ? parseInt(this.quantity) + parseInt(currentProduct.quantity) : parseInt(this.quantity),  
    //   }
    //   this.http.post("/order/create", params).subscribe(
    //     (response: any) => {
    //       this.communication.updateProduct.emit();
    //       this.router.navigate(['/checkout']);
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   )
    // }
    // else{
    //   this.communication.updateProduct.emit();
    //   this.router.navigate(['/checkout']);
    // }    
  }

}
