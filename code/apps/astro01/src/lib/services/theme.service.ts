import { merge, of, take, tap } from 'rxjs'
import { getSubject } from '~/lib/common/util'
import { getWindow } from "./layout.service"

// theme
const themeKey = 'theme'
const theme$ = getSubject<ThemeType>()
export type ThemeType = 'light' | 'dark'
export const getTheme = () => {
  const defaultThemeMode: ThemeType = 'dark'
  let v = localStorage.getItem(themeKey) as ThemeType
  if (!v) {
    v = defaultThemeMode
    localStorage.setItem(themeKey, defaultThemeMode)
  }
  return merge(of(v), theme$)
}
export const setTheme = (theme: ThemeType) => {
  getWindow()
    .pipe(
      take(1),
      tap((w) => {
        localStorage.setItem(themeKey, theme)
        w.document.documentElement.setAttribute('data-theme', theme)
        theme$.next(theme)
      }),
    )
    .subscribe()
}
