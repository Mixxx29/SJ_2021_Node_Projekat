<template>
  <div class="day-button">
    <img v-if="day" v-on:click="onClick" class="background" src="@/assets/images/day_button.svg">
    <img v-else class="background" src="@/assets/images/day_empty.svg">

    <p v-if="day" v-on:click="onClick">{{day}}</p>
  </div>
</template>

<script>
export default {
  name: "Day",

  props: {
    day: Number,
    str: String,
    date: String
  },

  methods: {
    onClick: function () {
      this.$router.push({name: 'Appointments', params: {date: this.date, str: this.str}});
    }
  },
}
</script>

<style scoped>
 .day-button {
   position: relative;
   cursor: pointer;
 }
 img {
   width: 80%;
 }

 p {
   position: absolute;
   top: 50%;
   left: 50%;
   -webkit-transform: translate(-50%, -50%);
   transform: translate(-50%, -50%);
   font-size: 30px;
 }
</style>