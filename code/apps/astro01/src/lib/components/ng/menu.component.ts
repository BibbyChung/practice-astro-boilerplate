import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { map } from 'rxjs'
import { getWindow } from '~/lib/services/layout.service'

@Component({
  // selector: 'app-menu',
  imports: [CommonModule],
  template: `
    <ul class="flex">
      @for (item of menus; track item.path) {
        <li class="mr-2">
          <a
            [ngClass]="{ 'text-red-500': (localPathName$ | async) === item.path }"
            class="text-blue-500 underline"
            [href]="item.path"
          >
            {{ item.title }}
          </a>
        </li>
      }
    </ul>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  baseUrl = import.meta.env.BASE_URL

  menus = [
    {
      title: 'Home',
      path: this.baseUrl + '',
    },
    {
      title: 'todolist-angular',
      path: this.baseUrl + 'todolist-angular/',
    },
  ]

  localPathName$ = getWindow().pipe(map((lo) => lo.location.pathname))
}
