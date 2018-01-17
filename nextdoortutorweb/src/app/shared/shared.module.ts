import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpImageDirective } from './http-image.directive';
import { ProfessorPipe } from './professor.pipe';
import { MaterializeModule } from 'angular2-materialize';

@NgModule({
  declarations: [
    HttpImageDirective,
    ProfessorPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    MaterializeModule,
    HttpImageDirective,
    ProfessorPipe
  ]
})
export class SharedModule {

}
