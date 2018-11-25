<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>HOST should be very clear, i think.</p>
    <ul>
      <li>
        <a v-href="'/demo1'">to demo1</a>
      </li>
      <li>
        <a v-href="'/demo2'">to demo2</a>
      </li>
    </ul>
  </div>
</template>

<script>
import host from "../main"

export default {
  name: 'HelloWorld',
  directives: {
    "href" (el, binding) {
      el.addEventListener('click', function handleHrefClicke(evt) {
        // eslint-disable-next-line
        console.log(el, evt, binding)
        host.history.push(binding.value)
      })
    }
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  cursor: pointer;
  color: #42b983;
}
</style>
