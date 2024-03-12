import { Component, ChangeDetectorRef, Injectable, OnInit } from '@angular/core';
/**
 * npm install --save @types/mockjs
 * npm install --save @types/mockjs
 */
import * as Mock from 'mockjs';  // Genera nombres, numeros aleatorios


// Nota: DataListProvider puede ser un servicio normal
@Injectable({
  providedIn: 'root'
})
export class DataListProvider {

  /**
   * Método que devuelve una lista de nombres aleatorios
   * @return [{}] lista de nombres aleatorios
   */
  get data() {
    const randomName = Mock.Random;
    return [
      randomName.first(),
      randomName.first(),
      randomName.first(),
      randomName.first()
    ]
  }
}




@Component({
  selector: 'app-detach',
  templateUrl: './detach.component.html',
  styleUrls: ['./detach.component.scss']
})
export class DetachComponent implements OnInit {
  /**
   * Cuando usarlo?
   * Cuando los cambios de los datos son demasiado agresivos que afectan el rendimiento de la aplicación
   * Ejemplo: El sistema actualiza los nombres(pueden ser otros datos) cada 1 segundo
   * Solución: Mostrar los datos cada 3 seg, de esta forma se evita que el componente (el elemento que cambia en el HTML) 
   * se renderice cada 1 seg. Es decir cada 3 seg actualizar la vista (HTML)
   */

  constructor(private _ref: ChangeDetectorRef, public dataListProvider: DataListProvider) { }

  ngOnInit(): void {
    /**
     * Desacoplar (TS y HTML) el componente del HTML con el metodo DETACH
     * no se mostraran los cambios hasta que se lo indique manualmente
     */
    this._ref.detach();


    /**
     * Cuando un componente esta descoplado, solo hay 2 formas
     * para decirle que replique los cambios en el HTML:
     * 
     * 1. detectChanges() => Detectar los cambios en ese momento y actualizar HTML
     * 2. reattach() => mostrado en el otro ejemplo, sirve para volver a ACOPLAR el componente (acopla TS y HTML)
     */

    // Cada 3 segundos, le decimos a angular que revise los cambios generados
    // es decir, que detecte los cambios en el componente y los muestre en el HTML

    setInterval(() => {
      // Detectamos los cambios y reacoplamos el componente
      // luego de detectar los cambios se vuele a desacoplar
      this._ref.detectChanges();
    }, 3000)
  }
}
