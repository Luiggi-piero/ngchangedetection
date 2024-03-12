import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngchangedetection';

  // Variable para el ejemplo REATTACH
  live = true;

  // Valores para el ejemplo ASYNC PIPE
  items: { numero: number }[] = [];
  items$ = new BehaviorSubject(this.items);

  addItem() {
    const nuevoItem = Math.floor(Math.random() * 100) + 1;
    this.items.push(
      {
        numero: nuevoItem
      }
    );

    this.items$.next(this.items);

  }

}
