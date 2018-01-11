import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpImageDirective } from './http-image.directive';
import { ProfessorPipe } from './professor.pipe';

@NgModule({
  declarations: [
    HttpImageDirective,
    ProfessorPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpImageDirective,
    ProfessorPipe
  ]
})
export class SharedModule {

}
