import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  email: any;

  constructor(private http: HttpRequestService, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  subscribe(){
    let params = {
      email: this.email
    }
    this.http.post("/subscribe/create", params).subscribe(
      (response: any) => {
        this.toast.success("Subscribed Successfully");
        this.email = '';
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
