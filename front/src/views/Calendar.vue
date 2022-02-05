<template>
  <div class="calendar">
    <Header v-bind:displayLogo="true"/>
    <div class="calendar-header">
      <div class="header-wrapper">
        <div class="arrow-wrapper">
          <img v-if="currentMonth > startMonth" src="@/assets/images/arrow.svg" alt="Next Month" v-on:click="decrementMonth()">
        </div>
        <p class="month">{{ displayedMonth }}</p>
        <div class="arrow-wrapper">
          <img v-if="currentMonth < startMonth + availableMoths - 1" src="@/assets/images/arrow.svg" alt="Next Month" v-on:click="incrementMonth()">
        </div>
      </div>
    </div>
    <img class="line" src="@/assets/images/line.svg" alt="">
    <div class="days container">
      <div class="row">
        <p v-for="i in 7" class="col">{{ days[i - 1] }}</p>
      </div>
    </div>
    <img class="line" src="@/assets/images/line.svg" alt="">
    <div class="calendar-body container">
      <div v-for="row in (daySum / 7)" class="row">
        <div
          v-for="col in 7"
          v-if="(row - 1) * 7 + (col - 1) < emptyDays || (row - 1) * 7 + (col - 1) >= emptyDays + availableDays"
          class="col"
        >
          <DayButton/>
        </div>
        <div v-else class="col">
          <DayButton
              v-bind:day="(row - 1) * 7 + (col - 1) - emptyDays + 1"
              v-bind:str="((row - 1) * 7 + (col - 1) - emptyDays + 1) + '. ' + months[currentMonth] + ' - ' + days[col - 1]"
              v-bind:date="computedDate((row - 1) * 7 + (col - 1) - emptyDays + 1)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import DayButton from '@/components/DayButton.vue'

export default {
  name: 'Calendar',

  components: {
    Header,
    DayButton
  },

  data: function() {
    return {
      currentMonth: 0,
      startMonth: 0,
      availableMoths: 6,
      lastAdded: 0,
      months: [
        'Januar', 'Februar', 'Mart', 'April',
        'Maj', 'Jun', 'Jul', 'Avgust',
        'Septembar', 'Oktobar', 'Novembar', 'Decembar'
      ],
      days: [
        'Ponedeljak', 'Utorak', 'Sreda', 'Cetvrtak', 'Petak', 'Subota', 'Nedelja'
      ]
    }
  },

  methods: {
    incrementMonth: function () {
      if (this.currentMonth < this.startMonth + this.availableMoths - 1) {
        this.currentMonth++;
      }
    },
    decrementMonth: function () {
      if (this.currentMonth > this.startMonth) {
        this.currentMonth--;
      }
    },
    computedDate: function (day) {
      return '2022-' + ((this.currentMonth < 9) ? ('0' + (this.currentMonth + 1)) : this.currentMonth + 1) + '-' +
          ((day < 10) ? ('0' + day) : day);
    }
  },

  computed: {
    displayedMonth: function () {
      return this.months[this.currentMonth % 12];
    },
    emptyDays: function () {
      var date = new Date();
      date.setMonth(this.currentMonth);
      date.setDate(0);
      return date.getDay();
    },
    availableDays: function () {
      var date = new Date();
      date.setMonth(this.currentMonth + 1);
      date.setDate(0);
      return date.getDate();
    },
    daySum: function () {
      var daysAfter = 0;
      if ((this.emptyDays + this.availableDays) % 7 !== 0) {
        daysAfter = 7 - (this.emptyDays + this.availableDays) % 7;
      }
      return this.emptyDays + this.availableDays + daysAfter;
    },
  },

  mounted: function () {
    this.startMonth = new Date().getMonth();
    this.currentMonth = this.startMonth;
  }
}
</script>

<style scoped>

  .calendar {
    margin-top: 12vh;
  }

  .calendar-header {
    width: 300px;
    margin: auto;
  }

  .header-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .arrow-wrapper {
    width: 50px;
  }

  .arrow-wrapper img {
    cursor: pointer;
    margin: auto;
    position: relative;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .arrow-wrapper:first-of-type img {
    -webkit-transform: scaleX(-1) translateY(-50%);
    transform: scaleX(-1) translateY(-50%);
  }

  .month {
    font-size: 28px;
  }

  .line {
    object-fit: cover;
    width: 50vw;
    height: 5px;
  }

  .days {
    width: 50vw;
    margin: auto;
    padding: 0 20px;
  }

  .days p {
    color: #cb7ca2;
  }

  .calendar-body {
    width: 50vw;
    margin: auto;
    padding: 0 20px;
  }

  .calendar-body .row {
    margin-top: 20px;
  }
</style>