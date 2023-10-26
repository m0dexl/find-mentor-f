import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';
import { FooterComponent } from '../footer/footer.component';
import { HowitworksComponent } from './howitworks/howitworks.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MentorComponent } from './mentor/mentor.component';
import { AboutComponent } from './about/about.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavbarComponent,
    HeroComponent,
    FooterComponent,
    HowitworksComponent,
    HomeComponent,
    CategoryComponent,
    MentorComponent,
    AboutComponent,
  ],
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  exports: [NavbarComponent, FooterComponent, CategoryComponent],
})
export class HomeModule {}
