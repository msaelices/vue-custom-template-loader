<template>
 <h1>{{ msg }}</h1>
</template>

<template-native>
  <label>{{ msg }}</label>
</template-native>

<script>
export default {
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>

<style>
  h1 {
    color: #53ba82;
  }
</style>
