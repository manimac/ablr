import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';
import { TempStorageService } from 'src/app/services/temp-storage/temp-storage.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommunicationService } from 'src/app/services/communication/communication.service';
import {
  IPayPalConfig,
  ICreateOrderRequest
} from 'ngx-paypal';
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
  paidAddress: any;
  selectedAddressId = null;
  showSuccess: any;
  showCancel: any;
  showError: any;
  public payPalConfig?: IPayPalConfig;
  ShowOrderCompleted: boolean = false;
  orderedDate: any;
  constructor(private http: HttpRequestService, private storage: TempStorageService, private toast: ToastrService, private communication: CommunicationService) {
    this.loadAddress();
    this.currentProduct = this.storage.getProductStorage();
    if (this.currentProduct && this.currentProduct.product) {
      this.initConfig();
      this.currentProduct.product.price = this.currentProduct.product.price;
    }

  }

  ngOnInit(): void {

    this.addressForm = new FormGroup({
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

  private initConfig(): void {
    let amount = this.totalAmt();
    this.payPalConfig = {
      currency: 'AUD',
      clientId: 'AQ-pXXaU3n7PnfvkgLBHQPYwAE488B2fnQkck34_4mQd6GKalo259k-5t40bZYCK3NzL0OKbutGWJJ57',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'AUD',
              value: amount,
              breakdown: {
                item_total: {
                  currency_code: 'AUD',
                  value: amount
                }
              }
            },
            items: [
              {
                name: this.currentProduct.product.name,
                quantity: this.currentProduct.quantity,
                unit_amount: {
                  currency_code: 'AUD',
                  value: this.currentProduct.product.price,
                },
              },
              {
                name: 'GST',
                quantity: '1',
                unit_amount: {
                  currency_code: 'AUD',
                  value: ((this.currentProduct.quantity * this.currentProduct.product.price)*0.10),
                },
              }
            ]
          }
        ],
        application_context: {
          shipping_preference: 'NO_SHIPPING'          
        }
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'pay',
        layout: 'horizontal',
        size: 'small'
      },
      onApprove: (data, actions) => {
        actions.order.get().then(details => {
        });

      },
      onClientAuthorization: (data) => {
        this.showSuccess = true;
        if (data.status == "COMPLETED" && data.payer && data.payer.payer_id) {
          this.toast.warning("Order has been processing");
          this.updatePayment(data);
        }
      },
      onCancel: (data, actions) => {
        this.showCancel = true;
        this.toast.error("Order has been cancelled");
      },
      onError: err => {
        this.showError = true;
        this.toast.error("Network error: Order has been cancelled");
      },
      onClick: (data, actions) => {
        // this.resetStatus();
      },
    };
  }

  updatePayment(data) {
    let user = this.storage.getStorage();
    let params = {
      user_id: user.id,
      status: data.status,
      transaction_id: data.payer.payer_id,
      address_id: this.shipmentId,
      paid_amount: data.purchase_units[0].amount.value,
      update_time: data.update_time,
      product_id: this.currentProduct.product.id,
      quantity: this.currentProduct.quantity,
    }
    this.http.post("/order/create", params).subscribe(
      (response: any) => {
        this.ShowOrderCompleted = true;
        this.orderedDate = data.update_time
        this.addressLists.forEach(element => {
          if(element.id == this.shipmentId){
            this.paidAddress = element;
          }
        });
        this.storage.clearProductStorage();
        this.communication.updateProduct.emit();
        this.toast.success("Order has been placed successfully");
      },
      (error) => {
        console.log(error);
        
      }
    )
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
          this.shipmentId = response[0].id;
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  totalAmt(){
    let price = this.currentProduct.quantity * this.currentProduct.product.price;
    let val: any = (price+(price*0.10)).toFixed(2)
    return val;
  }

  total() {
    return "$" + this.totalAmt();
  }

  getImage(element) {
    let str = element.image.split(",");
    return "http://ablr.com.au/uploads/" + str[0];
  }

  save() {
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
      let url = "/order/addresscreate";
      if (this.selectedAddressId) {
        this.addressForm.value['id'] = this.selectedAddressId;
        url = "/order/addressupdate";
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

  shipping(id) {
    this.shipmentId = id;
  }

  updateQuantity() {
    this.storage.setCheckoutProductStorage(this.currentProduct);
    this.communication.updateProduct.emit();
    this.initConfig();
  }

  // paynow() {
  //   let user = this.storage.getStorage();
  //   this.addressForm.value.user_id = user.id;
  //   let params = {
  //     name: this.currentProduct.product.name,
  //     price: this.currentProduct.product.price,
  //     quantity: this.currentProduct.product.quantity,
  //     total: (this.currentProduct.quantity * this.currentProduct.product.price),
  //   }
  //   this.http.post('/payment', this.addressForm.value).subscribe(
  //     (response: any) => {
  //       // this.loadAddress();
  //     },
  //     (error) => {
  //       if (error) {
  //         this.toast.error("Invalid data");
  //       }
  //     }
  //   )
  // }

  editAddress(address) {
    this.addressForm.patchValue(address);
    this.selectedAddressId = address.id
  }

  addAddress() {
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
