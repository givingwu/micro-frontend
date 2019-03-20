export default class Loading {
  start (msg) {
    console.log('loading ' + msg)
  }

  success (msg) {
    console.log('loading ' + msg)
  }

  fail (msg) {
    console.log('loading ' + msg)
  }

  failure (msg) {
    return Loading.fail(msg)
  }
}