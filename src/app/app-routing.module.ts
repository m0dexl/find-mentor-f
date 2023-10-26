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
import { AdminComponent } from './admin/admin/admin.component';
import { AdminUsercategoryComponent } from './admin/admin-usercategory/admin-usercategory.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to home page
  { path: 'home', component: HomeComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'notices', component: AdsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  { path: 'profile', component: ProfileComponent },
  { path: 'profile/my-notices', component: FormDetailsComponent },
  { path: 'contact/:id', component: FormComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'usercategory', component: AdminUsercategoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
