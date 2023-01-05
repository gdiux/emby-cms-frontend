import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(fecha: Date): any {
    
    let add = 60*300000;
    fecha = new Date(fecha);
    
    let date = new Date(fecha.getTime() + add); 
    
    return date.toLocaleDateString('es-CO');

  }

}
