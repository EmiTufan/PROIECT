import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "src/Service/api.service";

@Component({
  selector: "app-verify-email",
  templateUrl: "./verify-email.component.html",
  styleUrls: ["./verify-email.component.css"],
})
export class VerifyEmailComponent implements OnInit {
  public href: string = "";
  public urlSplit: any = "";
  public data: any = "";
  public message: any = "Please wait...";
  constructor(private api: ApiService, private router: Router) {}
  ngOnInit(): void {
    this.href = this.router.url;
    this.urlSplit = this.href.split("/");
    this.data = this.urlSplit[3];
    var that = this;

    setTimeout(function () {
      that.api.verifyEmailToken(that.data).subscribe(
        (data) => {
          that.message = data;
        },
        (err) => console.log(err)
      );
    }, 3000);
    setTimeout(function () {
      that.router.navigate(["login"]);
    }, 5000);
  }
}
