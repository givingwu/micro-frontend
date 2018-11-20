import { AppConfig } from './interface'

export function getDomNode(query: AppConfig['mountNode'] ) {
  if (query instanceof HTMLElement) {
    return query
  } else if (typeof query === 'string') {
    return document.querySelector(query)
  } else {
    return null
  }
}

export function getComponent(query: AppConfig['component']) {
  if (query) {
    if (typeof query === 'object') {
      return query
    } else if (typeof query === 'function') {
      return getAsyncComponent(query)
    }
  }

  return null
}

export async function getAsyncComponent(componentFn: Function) {
  const instance = await componentFn()
  return instance.default || instance
}