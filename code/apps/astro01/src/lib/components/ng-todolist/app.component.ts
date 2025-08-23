import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ListComponent } from './list.component'

@Component({
  selector: 'bb-app',
  imports: [CommonModule, ListComponent],
  template: `
    <div class="app-ccc flex justify-center">
      <div class="max-w-xl min-w-2xl">
        <bb-list />
        <footer class="info">
          <p>Created by <a href="http://twitter.com/bibbynet">Bibby</a></p>
          <p>Reference to <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: contents;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
