import { fromEvent, switchMap, tap } from 'rxjs'
import { getWindow } from './layout.service'

export const mountVTSwap = (pathnames: string[], func: () => void) => {
  getWindow()
    .pipe(
      switchMap((w) => fromEvent(w.document, 'astro:page-load')),
      tap((e) => {
        const d = e.target as Document
        const currentPathname = d.location.pathname
        // console.log(`mountVTSwap currentPathname: ${currentPathname}`)
        if (pathnames.includes(currentPathname) || pathnames.includes('*')) {
          func()
        }
      }),
    )
    .subscribe()
}

export const unmountVTSwap = (pathnames: string[], func: () => void) => {
  getWindow()
    .pipe(
      switchMap((w) => fromEvent(w.document, 'astro:before-swap')),
      tap((e) => {
        const d = e.target as Document
        const currentPathname = d.location.pathname
        // console.log(`unmountVTSwap currentPathname: ${currentPathname}`)
        if (pathnames.includes(currentPathname) || pathnames.includes('*')) {
          func()
        }
      }),
    )
    .subscribe()
}
