<template>
  <div id="header">
    <div class="wrapper">
      <img v-if="user" class="profile v-center" src="@/assets/images/profile.svg">
      <p v-if="user" class="username v-center">{{ username }}</p>
      <router-link v-if="displayLogo" to="/">
        <img class="logo v-center" src="@/assets/images/logo.svg">
      </router-link>
      <div class="auth v-center">
        <router-link to="/calendar">
          <div>Termini</div>
        </router-link>
        <router-link v-if="!user" to="/login">
          <div>Prijava</div>
        </router-link>
        <router-link v-if="!user" to="/register">
          <div>Registracija</div>
        </router-link>
        <div v-if="user" v-on:click="onLogout" class="logout">Odjava</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "Header",

  data: function () {
    return {
      user: null
    }
  },

  props: {
    displayLogo: Boolean
  },

  computed: {
    username: function () {
      if (this.user) {
        return this.user.username;
      }
    }
  },

  methods: {
    ...mapActions([
        'logout'
    ]),
    onLogout: function () {
      this.logout().then(() => {
        if (this.$route.fullPath !== '/') {
          this.$router.push({name: 'Home'});
        } else {
          this.$router.go();
        }
      });
    }
  },

  mounted: function () {
    if (this.displayLogo) {
      document.getElementById('header').style.boxShadow = '0 3px 10px #a06389';
    }

    if (localStorage.user && localStorage.user !== 'null') {
      this.user = JSON.parse(localStorage.user);
    }
  }
}
</script>

<style scoped>
  #header {
    height: 10vh;
    width: 100%;
    top: 0;
    position: fixed;
    background-color: #fffcf1;
    z-index: 100;
  }

  .wrapper {
    position: relative;
    text-align: center;
    width: 100%;
    height: 100%;
  }

  .profile {
    height: 6vh;
    position: absolute;
    left: 30px;
  }

  .username {
    position: absolute;
    left: calc(6vh + 40px);
  }

  .logo {
    height: 8vh;
  }

  .auth {
    position: absolute;
    right: 30px;
  }

  a, a:visited {
    color: inherit;
    text-decoration: none;
  }

  .auth div {
    display: inline;
    margin-right: 20px;
  }

  .logout {
    cursor: pointer;
  }
</style>