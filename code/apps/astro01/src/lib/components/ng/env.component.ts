import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  // selector: 'app-env',  
  imports: [],
  template: `
    <h2>===environment===</h2>
    <div>
      MODE: {{ env.MODE }} <br />
      BASE_URL: {{ env.BASE_URL }} <br />
      VITE_GIT_SHORT_VER: {{ env.PUBLIC_GIT_SHORT_VER }} <br />
      VITE_GIT_TIME: {{ env.PUBLIC_GIT_TIME }} <br />
      DB_PASSWORD(client is empty): {{ env.DB_PASSWORD }} <br />
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnvComponent {
  env = import.meta.env
}
