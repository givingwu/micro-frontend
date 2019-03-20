import { pageManger } from './PageManger'
import Loading from './Loading'
import PageRouter from './PageRouter'

if (!window.microFrontEnd) {
  /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
   */
  Object.defineProperties(
    window,
    'microFrontEnd',
    {
      get () {
        return Object.create(null)
      },
      configurable: false,
      enumerable: false,
      writeable: true,
    }
  )
}

const microFrontEnd = window.microFrontEnd

if (!microFrontEnd.pageManger) {
  microFrontEnd.pageManger = pageManger
}

// if freeze is available, prevents adding or
// removing the object prototype properties
// (value, get, set, enumerable, writable, configurable)
if (Object.freeze) {
  Object.freeze(microFrontEnd)
}

export default microFrontEnd
export {
  PageRouter,
  Loading,
}