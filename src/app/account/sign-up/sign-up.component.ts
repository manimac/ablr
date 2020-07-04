import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';
import { TempStorageService } from 'src/app/services/temp-storage/temp-storage.service';
import { ToastrService } from 'ngx-toastr';
import { CommunicationService } from 'src/app/services/communication/communication.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registerForm: FormGroup;
  constructor(@Inject(DOCUMENT) private document: Document, public router: Router, private http: HttpRequestService, private storage: TempStorageService, private toast: ToastrService, private communication: CommunicationService) {
    if (this.storage.getStorage()) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
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

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  register() {
    if (!this.registerForm.value.name) {
      this.toast.error("Please enter the name");
    }
    else if (!this.registerForm.value.email) {
      this.toast.error("Please enter the email");
    }
    else if (!this.validateEmail(this.registerForm.value.email)) {
      this.toast.error("Email is not valid");
    }
    else if (!this.registerForm.value.mobile) {
      this.toast.error("Please enter the phone number");
    }
    else if (!this.registerForm.value.password) {
      this.toast.error("Please enter the password");
    }
    else if (this.registerForm.value.password.length < 6) {
      this.toast.error("Password should atleast six characters");
    }
    else if (!this.registerForm.value.address1) {
      this.toast.error("Please enter the Address");
    }
    else if (!this.registerForm.value.city) {
      this.toast.error("Please enter the city");
    }
    else if (!this.registerForm.value.zipcode) {
      this.toast.error("Please enter the zip / postal code");
    }
    else {
      this.http.post('register', this.registerForm.value).subscribe(
        (response: any) => {
          if (response && response.success) {
            this.storage.setStorage(response.success);
            let productStorage = this.storage.getProductStorage();
            if (productStorage) {
              this.router.navigate(['/checkout']);
            }
            else {
              this.router.navigate(['/home']);
            }
          }
        },
        (error) => {
          if (error) {
            this.toast.error("Invalid data");
          }
        }
      )
    }
  }

}
