import { Component, Injectable, ChangeDetectorRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrecioBitcoinProvider {
  precio: number = 100;

  constructor() {

    // cada medio segundo se genera un nuevo precio del bitcoin
    setInterval(() => {
      this.precio = Math.floor(Math.random() * 1000) + 100;
      console.log(`Precio actual: ${this.precio}$`);
    }, 500)
  }
}

@Component({
  selector: 'app-reattach',
  templateUrl: './reattach.component.html',
  styleUrls: ['./reattach.component.scss'],
  inputs: ['enVivo'] // es igual como agregar @Input() enVivo mas abajo
})
export class ReattachComponent {

  mostrarEnVivo: boolean = true;

  constructor(private _ref: ChangeDetectorRef, public precioBitcoin: PrecioBitcoinProvider) { }

  set enVivo(valor: boolean) {
    this.mostrarEnVivo = valor;

    if(valor){
      this._ref.reattach(); // Reaclopamos TS y HTML para ver los cambios en vivo en el HTML
    }else {
      this._ref.detach(); // Desacoplamos el TS y HTML para NO actualizar la vista con los cambios del precio
    }
  }
}
