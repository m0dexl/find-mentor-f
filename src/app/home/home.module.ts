import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';
import { FooterComponent } from '../footer/footer.component';
import { HowitworksComponent } from './howitworks/howitworks.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    NavbarComponent,
    HeroComponent,
    FooterComponent,
    HowitworksComponent,
    HomeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
