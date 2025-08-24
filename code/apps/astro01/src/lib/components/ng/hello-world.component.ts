import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import confetti from 'canvas-confetti'
import { tap } from 'rxjs'
import { getSubject } from '~/lib/common/util'
import { EnvComponent } from '~/lib/components/ng/env.component'

@Component({
  // selector: 'app-hello-world',
  imports: [CommonModule],
  standalone: true,
  template: `
    <h2 class="p-2 font-serif text-2xl text-black">hello world - {{ lang }}</h2>
    <button class="btn mt-2" (click)="btnClick$.next($event)">click it</button>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelloWorldComponent {
  lang = 'svelte'

  btnClick$ = getSubject<Event>()

  bntClickSub = this.btnClick$
    .pipe(
      tap((e) => {
        e.preventDefault()
        confetti()
      }),
      takeUntilDestroyed(),
    )
    .subscribe()
}
