import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'professor'})
export class ProfessorPipe implements PipeTransform {
  transform(name: string): string {
    const names = name.split(' ');
    const lastName = names[names.length - 1];
    return `Prof. ${lastName}`;
  }
}
