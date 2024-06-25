import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViewsModule } from './views/views.module';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ViewsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ReactiveForm';

  ngOnInit(): void {
    initFlowbite();
  }
}
