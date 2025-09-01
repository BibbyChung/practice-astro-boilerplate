import { filter, fromEvent, map, switchMap, tap } from 'rxjs'
import { getBehaviorSubject } from '~/lib/common/util'

export const isClient = () => {
  try {
    if (window) {
      return true
    }
    return false
  } catch (err) {
    return false
  }
}

// window
export type windowType = Window & typeof globalThis
const window$ = getBehaviorSubject<windowType | null>(null)
export const setWindow = (w: windowType) => {
  window$.next(w)
}
export const getWindow = () =>
  window$.pipe(
    filter((a) => !!a),
    map((a) => a!),
  )

// title
const title$ = getBehaviorSubject<string | null>(null)
export const setTitle = (w: string) => {
  title$.next(w)
}
export const getTitle = () =>
  title$.pipe(
    filter((a) => !!a),
    map((a) => a!),
  )

// mount, unmount event
export const mountPage = (func: () => void) => {
  getWindow()
    .pipe(
      switchMap((w) => fromEvent(w.document, 'DOMContentLoaded')),
      tap((e) => {
        func()
      }),
    )
    .subscribe()
}

export const unmountPage = (func: () => void) => {
  getWindow()
    .pipe(
      switchMap((w) => fromEvent(w.document, 'visibilitychange')),
      tap((e) => {
        func()
      }),
    )
    .subscribe()
}
