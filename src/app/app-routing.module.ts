import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { HeroComponent } from './home/hero/hero.component';
import { HowitworksComponent } from './home/howitworks/howitworks.component';
import { CategoriesComponent } from './category/categories/categories.component';
import { LoginComponent } from './login/login/login.component';
import { AdsComponent } from './ads/ads/ads.component';
import { SignupComponent } from './login/signup/signup.component';
import { FormComponent } from './ads/form/form.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { FormDetailsComponent } from './profile/form-details/form-details.component';
import { FormDetailsPopUpComponent } from './profile/form-details-pop-up/form-details-pop-up.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to home page
  {path:"home",component:HomeComponent,
  children: [{path:"",component:HeroComponent},
  {path:"",component:HowitworksComponent}]},
  {path: "categories",component:CategoriesComponent},
  {path: "ads",component:AdsComponent},
  {path: "login", component:LoginComponent},
  {path: "signup", component: SignupComponent},
  
  {path: "profile", component:ProfileComponent},
  {path: "profile-ads", component:FormDetailsComponent},
  {path: "profile-ads2", component:FormDetailsPopUpComponent},
  {path: "iletisim", component:FormComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
