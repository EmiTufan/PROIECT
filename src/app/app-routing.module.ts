import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/authGuard/auth.guard";
import { IsLoginGuard } from "src/authGuard/is-login.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { VerifyEmailComponent } from "./verify-email-adress/verify-email/verify-email.component";

const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [IsLoginGuard] },
  { path: "", component: HomeComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "verify",
    component: VerifyEmailComponent,
    children: [{ path: "email-adress/:id", component: VerifyEmailComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponent = [LoginComponent, HomeComponent];
