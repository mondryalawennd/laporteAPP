import { Pipe, PipeTransform } from '@angular/core';
import { Cargo } from '../Models/Cargo';
@Pipe({
  name: 'cargoNome',
  standalone: true 
})
export class CargoNomePipe implements PipeTransform {
  transform(value: number): string {
    return Cargo[value];
  }
}