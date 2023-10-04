import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HowitworksComponent } from './howitworks/howitworks.component';



@NgModule({
  declarations: [
    NavbarComponent,
    HeroComponent,
    FooterComponent,
    HowitworksComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
