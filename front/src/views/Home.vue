<template>
  <div class="home">
    <Header/>
    <router-link to="/">
      <img class="logo" src="@/assets/images/logo.svg">
    </router-link>
    <p class="title">
      Najbolji termini uvek slobodni za vas.
      <br>
      Zakazite jos danas!
    </p>
    <div class="button">
      <router-link to="/calendar">
        <img src="@/assets/images/zakazi.svg">
      </router-link>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'Home',
  components: {
    Header
  }
}
</script>

<style scoped>

.home {
  margin-top: 10vh;
}

.title {
  font-size: 36px;
  margin-top: -20px;
}

.button {
  margin-top: 150px ;
}

.button img {
  width: 250px;
}
</style>
