import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  ViewChild,
  INJECTOR,
  Inject,
  Renderer2,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import { ApiService } from "src/Service/api.service";
import { MODEL } from "src/models/model";
import { map, NotFoundError } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenService } from "src/Service/token.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(
    private api: ApiService,
    private router: Router,
    private tokenService: TokenService
  ) {}
  logo: string = "aXF.";
  spinner: boolean = false;
  messageSuccess: boolean = false;
  error: any = "";
  errorInfo: any = "";
  theme: any = true;
  singup: boolean = true;
  toggle: boolean = false;
  scrollTop = 0;
  hideNav = false;
  email: string = "";
  password: string = "";
  Fname: string = "";
  Lname: string = "";
  nume: string = "";
  confirmpassword: string = "";
  phonenr: string = "";
  id = "1";
  list: any = [];
  data: any = [];
  ngOnInit(): void {
    document.body.classList.add("login");
    document.body.style.backgroundColor = "#aa855c";
    if (
      JSON.stringify(localStorage.getItem("theme")) == JSON.stringify("TRUE")
    ) {
      this.theme = true;
    } else {
      this.theme = false;
    }
  }

  showMessageSuccess() {
    var that = this;
    setTimeout(function () {
      that.messageSuccess = false;
    }, 3000);
  }

  senddata() {
    const datax = { email: this.email, password: this.password };

    if (this.email == "" || this.password == "") {
      this.messageSuccess = true;
      this.showMessageSuccess();
      this.error = "Error";
      this.errorInfo = "Please complet data";
    } else {
      this.api.getByEmail(datax).subscribe(
        (data) => {
          if (data == "error") {
            this.messageSuccess = true;
            this.showMessageSuccess();
            this.error = "Error";
            this.errorInfo = "Username Or Password not working";
          } else {
            this.data = data;
            const helper = new JwtHelperService();
            const decodedToken = helper.decodeToken(this.data);
            if (decodedToken.row.isEmailVerify != "yes") {
              this.messageSuccess = true;
              this.showMessageSuccess();
              this.error = "Error";
              this.errorInfo =
                "Please check your inbox for verify email adress";
            } else {
              this.spinner = true;
              this.tokenService.saveToken(this.data);
              var that = this;
              setTimeout(function () {
                that.router.navigate(["dashboard"]);
              }, 3000);
            }
          }
        },
        (error) => {
          if ((error.statut = 300)) {
            this.messageSuccess = true;
            this.showMessageSuccess();
            this.error = "Error";
            this.errorInfo = "Username Or Password not working";
          }
        }
      );
    }
  }
  singupdata() {
    const data = {
      Fname: this.Fname,
      Lname: this.Lname,
      email: this.email,
      phonenr: this.phonenr,
      password: this.password,
    };
    this.api.createUser(data).subscribe(
      (data) => {
        this.list = data;
        console.log(this.list.code);
        if (this.list.code) {
          this.messageSuccess = true;
          this.showMessageSuccess();
          this.error = "Error";
          this.errorInfo = "Email aledary exist!";
        } else {
          var that = this;
          this.messageSuccess = true;
          this.showMessageSuccess();
          this.error = "Succes";
          this.errorInfo = "Please check your email to verify email adress";

          setTimeout(function () {
            that.spinner = true;
            that.singup = true;
          }, 3000);

          setTimeout(function () {
            that.spinner = false;
            that.singup = true;
          }, 5000);
        }
      },
      (error) => {
        this.messageSuccess = true;
        this.showMessageSuccess();
        console.log(error);
        this.error = "Error";
        this.errorInfo = "All data required!";
      }
    );
  }

  clickEvent($event: any) {
    this.toggle = !this.toggle;
  }
  createaccount() {
    this.singup = !this.singup;
  }
  onScroll($event: any) {
    this.scrollTop < $event.target.scrollTop;
    this.scrollTop = $event.target.scrollTop;
    console.log(this.scrollTop);
  }
  changedark() {
    if ((this.theme = !this.theme)) {
      localStorage.setItem("theme", "TRUE");
    } else {
      localStorage.setItem("theme", "FALSE");
    }
  }
}
