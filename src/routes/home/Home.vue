<template>
  <div class="App">
    <header class='App-header'>
      <img src='../../assets/images/logo.png' class='App-logo' alt='logo' />
      <h1 class='App-title'>Home</h1>
    </header>
    <div>---Route---</div>
    <div>
      <button @click='gotoUser'>Goto User</button>
    </div>
    <div>---vuex---</div>
    <div>
      <button @click='showTime()'>Show Time</button>
      <button @click='showCustomMsg'>Show Custom Msg</button>
      <button @click='hideTime'>Hide Time</button>
      <button @click='clearHome'>Clear Home</button>
      <div class='App-msg'>{{ time }}</div>
    </div>
    <div>---Async Request---</div>
    <div>
      <button v-if='!loading' @click='asyncPull'>Async Pull</button>
      <div v-else>Loading</div>
      <div class='App-msg'>{{ requestData }}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapState('home', ['time', 'loading', 'requestData']),
    ...mapGetters('user', { userEvenOrOdd: 'evenOrOdd' })
  },
  methods: {
    gotoUser() {
      this.$router.push('/user');
    },
    showCustomMsg() {
      this.showTime(`Custom Msg ${new Date().toString()}`);
    },
    ...mapActions('home', ['showTime', 'hideTime', 'clearHome', 'asyncPull'])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.App {
  text-align: center;
}

.App-logo {
  animation: App-logo-spin infinite 20s linear;
  height: 80px;
}

.App-header {
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
}

.App-title {
  font-size: 1.5em;
}

.App-intro {
  font-size: large;
}

.App-msg {
  padding: 6px;
  background: lightgray;
}

@keyframes App-logo-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
