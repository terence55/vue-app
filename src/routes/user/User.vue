<template>
  <div class="App">
    <header class='App-header'>
      <img src='../../assets/images/logo.png' class='App-logo' alt='logo' />
      <h1 class='App-title'>{{ localeText('user.title') }}</h1>
    </header>
    <div>---Route---</div>
    <div>
      <button @click='gotoHome'>Goto Home</button>
    </div>
    <div>---i18n---</div>
      <div className='App-intro'>
      <div>{{ localeText('user.date', new Date().toDateString()) }}</div>
      <div>{{ localeText('user.time', { time: new Date().toTimeString() }) }}</div>
      <div>{{ localeText('user.welcome', { name: 'Jason', count: 25 }) }}</div>
      <button @click="switchLocale('zh-CN')">Set locale to CH</button>
      <button @click="switchLocale('en-US')">Set locale to EN</button>
    </div>
    <div>---Mock---</div>
    <div>
      <button @click='getUserList'>Get User List</button>
      <button @click='getUser'>Get User</button>
      <info v-if='userList !== null' v-bind:content='JSON.stringify(userList)' />
      <info v-if='user !== null' v-bind:content='JSON.stringify(user)' />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Info from './components/Info';
import localeText, { setLocaleToCookie } from '../../utils/localeUtils';

export default {
  name: 'User',
  components: {
    info: Info
  },
  computed: {
    ...mapState('user', ['loading', 'userList', 'user'])
  },
  methods: {
    gotoHome() {
      this.$router.push('/home');
    },
    switchLocale(locale) {
      setLocaleToCookie(locale);
      window.location.reload();
    },
    localeText: localeText,
    ...mapActions('user', ['getUserList', 'getUser'])
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

@keyframes App-logo-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
