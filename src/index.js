import PageManger from './PageManger'

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
  microFrontEnd.pageManger = new PageManger()
}

// if freeze is available, prevents adding or
// removing the object prototype properties
// (value, get, set, enumerable, writable, configurable)
export default Object.freeze(microFrontEnd)
