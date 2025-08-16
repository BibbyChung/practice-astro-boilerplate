import { Observable } from 'rxjs'
import {
  readonly,
  writable,
  type Readable,
  type StartStopNotifier,
  type Unsubscriber,
  type Writable,
} from 'svelte/store'

// https://stackoverflow.com/questions/71570197/how-to-not-trigger-svelte-store-subscription-if-the-value-was-not-changed
export const writeableFlexible = <T>(value?: T, start?: StartStopNotifier<T>) => {
  const store = writable(value, start)

  return {
    ...store,
    subscribe(subscriber: (arg: T) => void, skipInitial = false) {
      let initial = true
      const unsubscribe = store.subscribe(($value) => {
        if (!skipInitial || !initial) {
          subscriber($value)
        }
      })
      initial = false
      return unsubscribe
    },
  }
}

export const toObservable = <T>(svelteStore: Writable<T> | Readable<T>) => {
  let unsub: Unsubscriber
  const obs = new Observable<T>((subscriber) => {
    unsub = svelteStore.subscribe((val) => {
      subscriber.next(val)
    })

    return () => {
      unsub()
    }
  })

  return obs
}

export const toStore = <T>(obs: Observable<T>) => {
  const store = writable<T>()
  obs.subscribe({
    next: (v) => store.set(v),
  })
  return readonly(store)
}
