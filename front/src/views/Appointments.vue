<template>
  <div class="appointments">
    <Header v-bind:displayLogo="true"/>
    <p class="date">{{ str }}</p>
    <div class="wrapper">
      <Appointment v-for="i in hoursComputed" v-bind:time="(7 + i) + ':00'" v-bind:date="date" v-bind:index="i - 1" class="appointment"/>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Appointment from "../components/Appointment.vue";

import { mapActions } from "vuex";

export default {
  name: "Appointments",

  components: {
    Header,
    Appointment
  },

  data: function () {
    return {
      hours: 0,
    }
  },

  props: {
    str: String,
    date: String
  },

  computed: {
    hoursComputed: function () {
      return this.hours;
    }
  },

  methods: {
    ...mapActions([
        'getAppointments'
    ])
  },

  mounted: function () {
    this.getAppointments(this.date).then(() => {
      this.hours = 13;
    });
  },
}
</script>

<style scoped>

  .appointments {
    margin-top: 12vh;
  }

  .date {
    font-size: 28px;
  }

  .wrapper {
    width: 40vw;
    margin: 30px auto;
  }

  .appointment {
    margin: 30px 0;
  }

</style>