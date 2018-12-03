<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>HOST should be very clear, i think.</p>
    <ul>
      <li>
        <a v-href="app1.path">to demo1 project</a>
      </li>
      <li>
        <a v-href="app2.path">to demo2 project</a>
      </li>
    </ul>
  </div>
</template>

<script>
import host from '../main'
import app1 from '../../../frontend-1/src/main'
import app2 from '../../../frontend-2/src/main'

// eslint-disable-next-line
console.log('host project:', host)

export default {
  name: 'HelloWorld',
  data() {
    return {
      app1,
      app2,
    }
  },
  directives: {
    "href" (el, binding) {
      el.addEventListener('click', function handleHrefClick(evt) {
        // eslint-disable-next-line
        console.log(evt, binding)
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
