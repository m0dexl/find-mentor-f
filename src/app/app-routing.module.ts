import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { HeroComponent } from './home/hero/hero.component';
import { HowitworksComponent } from './home/howitworks/howitworks.component';
import { CategoriesComponent } from './category/categories/categories.component';
import { LoginComponent } from './login/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to home page
  {path:"home",component:HomeComponent,
  children: [{path:"",component:HeroComponent},
  {path:"",component:HowitworksComponent}]},
  {path: "categories",component:CategoriesComponent},
  {path: "login", component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
