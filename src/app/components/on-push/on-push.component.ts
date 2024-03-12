import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-on-push',
  templateUrl: './on-push.component.html',
  styleUrls: ['./on-push.component.scss'],
  // changeDetection: ChangeDetectionStrategy.Default // un cambio en el controlador (valor en el archivo TS, supone una re renderización en HTML)
  changeDetection: ChangeDetectionStrategy.OnPush  // un cambio en el controlador, NO significa mostrarlo por HTML(se tiene que hacerlo manualmente)
})
export class OnPushComponent implements OnInit {

  // valor que se incrementa cada segundo en el archivo TS
  // y que dependiendo de la estrategia de change detection sus cambios
  // se van a poder ver en el HTML   
  segundos = 0;

  constructor(private _cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    setInterval(() => {
      this.segundos++;
      console.log('Segundos trancurridos: ' + this.segundos);
    }, 1000)
  }

  actualizarSegundos() {
    this._cdr.detectChanges();
  }

}
