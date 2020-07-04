import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';
import { TempStorageService } from 'src/app/services/temp-storage/temp-storage.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommunicationService } from 'src/app/services/communication/communication.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  currentProduct: any = {};
  addressLists: any = [];
  addressForm: FormGroup;
  shipmentId: any = null;
  selectedAddressId = null;
  constructor(private http: HttpRequestService, private storage: TempStorageService, private toast: ToastrService, private communication: CommunicationService) { 
    this.loadAddress();
    this.currentProduct = this.storage.getProductStorage();
  }

  ngOnInit(): void {
    this.addressForm =  new FormGroup({
      name: new FormControl(''),
      mobile: new FormControl(''),
      company: new FormControl('test'),
      address1: new FormControl(''),
      address2: new FormControl(''),
      city: new FormControl(''),
      zipcode: new FormControl(''),
      state: new FormControl('test'),
      country: new FormControl('test')
    })
  }

  loadAddress() {
    let user = this.storage.getStorage();
    let params = {
      user_id: user.id
    }
    this.http.post("/order/address", params).subscribe(
      (response: any) => {
        if (response && response.length > 0) {
          this.addressLists = response;
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  total(){
    return "$"+ (this.currentProduct.quantity * this.currentProduct.product.price);
  }

  getImage(element){
    let str = element.image.split(",");
    return "http://localhost:8000/uploads/" + str[0];
  }

  save(){
    if (!this.addressForm.value.name) {
      this.toast.error("Please enter the name");
    }
    else if (!this.addressForm.value.mobile) {
      this.toast.error("Please enter the phone number");
    }
    else if (!this.addressForm.value.address1) {
      this.toast.error("Please enter the Address");
    }
    else if (!this.addressForm.value.city) {
      this.toast.error("Please enter the city");
    }
    else if (!this.addressForm.value.zipcode) {
      this.toast.error("Please enter the zip / postal code");
    }
    else if (!this.addressForm.value.state) {
      this.toast.error("Please enter the state");
    }
    else if (!this.addressForm.value.country) {
      this.toast.error("Please enter the country");
    }
    else {
      let user = this.storage.getStorage();
      this.addressForm.value.user_id = user.id;
      let url = "order/addresscreate";
      if(this.selectedAddressId){
        this.addressForm.value['id'] = this.selectedAddressId;
        url = "order/addressupdate";
      }
      this.http.post(url, this.addressForm.value).subscribe(
        (response: any) => {
          this.loadAddress();
          this.selectedAddressId = null;
          this.addressForm.value.user_id = null;
          this.addressForm.value['id'] = null;
        },
        (error) => {
          if (error) {
            this.toast.error("Invalid data");
          }
        }
      )
    }
  }

  shipping(id){
    this.shipmentId = id;
  }

  updateQuantity(){
    this.storage.setProductStorage(this.currentProduct);
    this.communication.updateProduct.emit();
  }

  paynow(){
    let user = this.storage.getStorage();
    this.addressForm.value.user_id = user.id;
    this.http.post('order/updatePayment', this.addressForm.value).subscribe(
      (response: any) => {
        this.loadAddress();
      },
      (error) => {
        if (error) {
          this.toast.error("Invalid data");
        }
      }
    )
  }

  editAddress(address){
    this.addressForm.patchValue(address);
    this.selectedAddressId = address.id
  }

  addAddress(){
    let address = {
      name: '',
      mobile: '',
      company: 'test',
      address1: '',
      address2: '',
      city: '',
      zipcode: '',
      state: 'test',
      country: 'test'
    }
    this.addressForm.patchValue(address);
    this.selectedAddressId = null;
  }

}
