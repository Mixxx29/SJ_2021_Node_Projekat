<template>
  <div v-on:click="reserve" class="appointment">
    <p class="time v-center">{{ time }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "Appointment",

  data: function () {
    return {
      reserved: false
    }
  },

  props: {
    time: String,
    date: String,
    index: Number,
  },

  computed: {
    ...mapState([
      'appointments'
    ])
  },

  watch: {
    appointments: function () {
      this.update();
    }
  },

  methods: {
    reserve: function () {
      if (!localStorage.user || localStorage.user === 'null') {
        this.$router.push({name: 'Login'})
        return;
      }

      if (this.reserved) {
        return;
      }

      var date;
      var time = parseInt(this.time.split(':')[0]);
      if (time++ < 9) {
        date = new Date(this.date + 'T0' + time + ':00:00');
      } else {
        date = new Date(this.date + 'T' + time + ':00:00');
      }


      var user = JSON.parse(localStorage.user);
      this.$socket.emit('change', {token: user.token, userID: user.id, date: date});
    },

    update: function () {
      if (this.reserved) return;
      this.appointments.forEach(appointment => {
        if (appointment.date.includes(this.date + 'T' + this.time.split(':')[0]) ||
            appointment.date.includes(this.date + 'T0' + this.time.split(':')[0])) {
          document.getElementsByClassName('appointment')[this.index].style.cursor = 'default';
          document.getElementsByClassName('appointment')[this.index].style.backgroundColor = '#cb7ca2';
          document.getElementsByClassName('appointment')[this.index].style.boxShadow = 'none';
          this.reserved = true;
        }
      });
    },
  },

  mounted: function () {
    this.update();
  },

  // sockets: {
  //   change: function () {
  //     setTimeout(() => {
  //       this.update();
  //     }, 2000);
  //   },
  // },
}
</script>

<style scoped>

  .appointment {
    height: 100px;
    margin-top: 30px;
    box-shadow: 0 0 5px 5px #e1aea4;
    background-color: #fffcf1;
    text-align: left;
    cursor: pointer;
  }

  .time {
    margin-left: 20px;
  }

</style>