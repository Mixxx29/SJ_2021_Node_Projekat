<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Home',

  sockets: {
    error: function (err) {
      if (err.msg === 'Not Authenticated') {
        this.$router.push({name: 'Login'});
      }
    },
  },
}
</script>