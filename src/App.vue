<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <button v-if='authenticated' v-on:click='logout' id='logout-button'> Logout </button>
    <button v-else v-on:click='login' id='login-button'> Login </button>
    <router-view/>
  </div>
</template>


<script>

  export default {
    name: 'app',
    data: function () {
      return {
        authenticated: false
      }
    },
    created() {
      this.isAuthenticated()
    },
    watch: {
      // Everytime the route changes, check for auth status
      '$route': 'isAuthenticated'
    },
    methods: {
      async isAuthenticated() {
        this.authenticated = await this.$auth.isAuthenticated()
      },
      login() {
        this.$auth.loginRedirect('/')
      },
      async logout() {
        await this.$auth.logout()
        await this.isAuthenticated()

        // Navigate back to home
        this.$router.push({ path: '/' })
      }
    }
  }
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
