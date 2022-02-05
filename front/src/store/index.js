import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    appointments: [],
  },

  mutations: {
    setUser: function (state, user) {
      state.user = user;
      if (user) {
        localStorage.user = JSON.stringify(user);
      } else {
        localStorage.user = null;
      }
    },
    addAppointment: function (state, appointment) {
      state.appointments.push(appointment);
    }
  },

  actions: {
    getAppointments: function ({commit}, date) {
      return new Promise((resolve => {
        fetch(`http://sj-projekat.herokuapp.com:8081/user/appointments/${date}`).then(result => {
          result.json().then(appointments => {
            appointments.forEach(appointment => {
              commit('addAppointment', appointment);
            });
            resolve();
          });
        });
      }))
    },
    login: function ({commit}, form) {
      return new Promise((resolve, reject) => {
        fetch('http://sj-projekat.herokuapp.com:8082/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: form.username,
            password: form.password
          })
        }).then(result => {
          result.json().then(user => {
            if (user.token) {
              commit('setUser', user);
              resolve();
            }
            reject({msg: user.msg});
          });
        });
      });
    },
    register: function ({commit}, form) {
      return new Promise((resolve, reject) => {
        if (form.username.length < 3) {
          return reject({msg: 'Korisnicko ime mora sadrzati minimalno 3 karaktera!'});
        }

        if (form.password.length < 3) {
          return reject({msg: 'Sifra mora sadrzati minimalno 3 karaktera!'});
        }

        if (form.password !== form.repeatedPassword) {
          return reject({msg: 'Sifre se ne poklapaju!'});
        }

        fetch('http://sj-projekat.herokuapp.com:8082/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: form.username,
            password: form.password
          })
        }).then(result => {
          result.json().then(user => {
            if (user.token) {
              commit('setUser', user);
              return resolve();
            }

            return reject({msg: user.msg});
          });
        });
      });
    },
    logout: function ({commit}) {
      return new Promise((resolve, reject) => {
        commit('setUser', null);
        resolve();
      })
    },
    socket_change: function ({commit}, msg) {
      commit('addAppointment', JSON.parse(msg));
    },
  }
})