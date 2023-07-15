import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";

const routes: Routes = [
  {
    path: "",
    loadComponent: () => ProfileComponent,
  },
  {
    path: "login",
    loadComponent: () => LoginComponent,
  },
  // TODO disabled until deemed useful
  // {
  //   path: "edit",
  //   loadComponent: () => EditComponent,
  //   canActivate: [AuthGuardService]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
