<template>
  <div id="auth">
    <router-link to="/">
      <img class="logo" src="@/assets/images/logo.svg">
    </router-link>
    <p v-if="isRegister" class="title">Registracija</p>
    <p v-else="login" class="title">Prijava</p>
    <div class="form">
      <b-form-group id="input-group-1" label="Korisnicko ime:" label-for="input-1" class="label">
        <b-form-input
            id="input-1"
            v-model="form.username"
            type="text"
            placeholder="Unesite korisnicko ime"
            required
            class="input"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Sifra:" label-for="input-2" class="label">
        <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            placeholder="Unesite sifru"
            required
            class="input"
        ></b-form-input>
      </b-form-group>

      <b-form-group v-if="isRegister" id="input-group-3" label="Ponovljena sifra:" label-for="input-3" class="label">
        <b-form-input
            id="input-3"
            v-model="form.repeatedPassword"
            type="password"
            placeholder="Ponovite sifru"
            required
            class="input"
        ></b-form-input>
      </b-form-group>

      <p v-if="msg" class="msg">{{msg}}</p>

      <img
        tabindex="0"
        v-if="isRegister"
        v-on:click="onRegister"
        v-on:keydown="onRegister"
        src="@/assets/images/register.svg"
        alt="Registracija"
        class="button"
      >
      <img
        tabindex="0"
        v-else
        v-on:click="onLogin"
        v-on:keydown="onLogin"
        src="@/assets/images/login.svg"
        alt="Prijava"
        class="button"
      >
    </div>

    <router-link v-if="isRegister" to="/login" class="down">Imate nalog? Prijavite se ovde!</router-link>
    <router-link v-else to="/register" class="down">Nemate nalog? Registrujte se ovde!</router-link>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "Authentication",

  data: function () {
    return {
      msg: '',
      form: {
        username: '',
        password: '',
        repeatedPassword: ''
      },
    }
  },

  props: {
    isRegister: Boolean
  },

  methods: {
    ...mapActions([
        'login',
        'register'
    ]),
    onLogin: function (event) {
      if (event.key && event.key !== 'Enter' && event.key !== ' ') return;
      this.login(this.form).then(() => {
        this.$router.push({name: 'Home'});
      }).catch(err => {
        this.msg = err.msg;
      })
    },
    onRegister: function (event) {
      if (event.key && event.key !== 'Enter' && event.key !== ' ') return;

      this.register(this.form).then(() => {
        this.$router.push({name: 'Home'});
      }).catch(err => {
        this.msg = err.msg;
      })
    },
  }
}
</script>

<style scoped>
  .logo {
    width: 300px;
  }

  .title {
    margin-top: 20px;
    font-size: 28px;
  }

  .form {
    width: 25vw;
    margin: auto;
    color: #a06389;
  }

  .label {
    margin: 20px 0 0 10px;
    text-align: left;
  }

  .input, .input:focus {
    margin-left: -10px;
    color: #684971;
  }

  .input::placeholder {
    opacity: 0.7;
  }

  .button {
    height: 50px;
    margin-top: 40px;
    margin-bottom: 20px;
    cursor: pointer;
    user-focus: true;
  }

  .down {
    color: #684971;
  }

  .msg {
    margin-top: 10px;
    color: #cb7ca2;
  }

</style>