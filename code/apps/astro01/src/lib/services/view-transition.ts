import { tap } from 'rxjs'
import { getWindow } from './layout.service'

export const mountVTSwap = (func: () => void) => {
  getWindow()
    .pipe(
      tap((w) => {
        w.document.addEventListener('astro:after-swap', () => {
          func()
        })
      }),
    )
    .subscribe()
}

export const unmountVTSwap = (func: () => void) => {
  getWindow()
    .pipe(
      tap((w) => {
        w.document.addEventListener('astro:before-swap', () => {
          func()
        })
      }),
    )
    .subscribe()
}
