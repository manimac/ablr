import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';
import { TempStorageService } from 'src/app/services/temp-storage/temp-storage.service';
import { ToastrService } from 'ngx-toastr';
import { CommunicationService } from 'src/app/services/communication/communication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(@Inject(DOCUMENT) private document: Document, public router: Router, private http: HttpRequestService, private storage: TempStorageService, private toast: ToastrService, private communication: CommunicationService) {
    if (this.storage.getStorage()) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    })
  }

  login() {
    if (!this.loginForm.value.email) {
      this.toast.error("Please enter the email");
    }
    else if (!this.loginForm.value.password) {
      this.toast.error("Please enter the password");
    }
    else {
      this.http.post('/login', this.loginForm.value).subscribe(
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
            this.toast.error("Invalid credentials");
          }
        }
      )
    }
  }

}
