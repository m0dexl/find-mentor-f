import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesContentComponent } from './categories-content/categories-content.component';
import { HomeModule } from '../home/home.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CategoriesComponent, CategoriesContentComponent],
  imports: [CommonModule, HomeModule, RouterModule],
})
export class CategoryModule {}
