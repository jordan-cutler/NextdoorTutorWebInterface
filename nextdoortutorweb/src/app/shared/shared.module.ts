import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpImageDirective } from './http-image.directive';

@NgModule({
  declarations: [
    HttpImageDirective
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpImageDirective
  ]
})
export class SharedModule {

}
