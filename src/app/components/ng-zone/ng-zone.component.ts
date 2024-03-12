import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-ng-zone',
  templateUrl: './ng-zone.component.html',
  styleUrls: ['./ng-zone.component.scss']
})
export class NgZoneComponent {

  progreso = 0; // valor que ira de 0% a 100%
  texto = '';  // Indica si esta Dentro / Fuera de Angular Zone

  constructor(private _ngZone: NgZone) { }

  /**
   * Método para incrementar el valor de 0 a 100 el valor del progreso
   * @param terminar Callback que se ejecuta al terminar el incremento
   */
  incrementarProgreso(terminar: () => void) {
    
    if (this.progreso < 100) {
      this.progreso += 1; // Incrementamos el progreso en 1
      console.log(`progreso actual: ${this.progreso}%`);

      window.setTimeout(() => {
        this.incrementarProgreso(terminar); // Recursividad para seguir incrementando
      }, 10);

    } else {
      // termino de incrementarse, ejecutamos el callback
      terminar();
    }
  }

  /**
   * Método que aumenta el progreso
   * DENTRO de NGZONE
   * - Implica que los cambios se ven en el HTML
   */
  aumentarDentroNgZone() {
    this.texto = 'DENTRO';
    this.progreso = 0; // reseteamos para que inicie desde 0
    this.incrementarProgreso(
      () => console.log(`${this.texto} de Angular Zone: incremento terminado`)
    )
  }

  /**
   * Método que aumenta el progreso
   * FUERA de NGZONE (se usa para ejecutar cosas en segundo plano)
   * Implica que los cambios NO SE VAN A VER en el HTML
   * hasta que el meter el componente en el Angular Zone
   */
  aumentarFueraNgZone() {
    this.texto = 'FUERA';
    this.progreso = 0; // reseteamos para que inicie desde 0

    // Ejecutamos fuera de Angular Zone
    this._ngZone.runOutsideAngular(() => {
      this.incrementarProgreso(
        () => {
          
        // CUANDO TERMINE DE INCREMENTAR
        // Es cuando pasamos a ejecutar en Angular Zone de nuevo
        // Volvemos a reacoplar el componente TS y HTML
        this._ngZone.run(() => console.log(`${this.texto} de Angular Zone: incremento terminado`))
        }
      )
    })
  }

}
