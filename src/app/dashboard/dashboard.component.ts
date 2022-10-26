import { Component, OnInit } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ApiService } from "src/Service/api.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  infoaccount: any = "";
  email: any = "";
  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.infoaccount = localStorage.getItem("authToken");
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.infoaccount);
    const truea = helper.isTokenExpired(this.infoaccount);
    this.email = truea;
  }

  getAlldata() {
    this.api.getAllData().subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
  }
}
