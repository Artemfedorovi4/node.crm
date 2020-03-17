<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark rounded">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar1" aria-controls="navbar1"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" >MyCRM</a>
    <div class="collapse navbar-collapse justify-content-md-left" id="navbar1">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li v-if=" this.$store.getters.authStatus=='success'" class="nav-item">
          <router-link class="nav-link" to="/profile">Profile</router-link>
        </li>
        <li v-if=" this.$store.getters.authStatus=='success'" class="nav-item">
          <router-link class="nav-link" to="/emploeers">Emp</router-link>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li v-if="!this.$store.getters.authStatus" class="nav-item">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
        <li v-if="!this.$store.getters.authStatus" class="nav-item">
          <router-link class="nav-link" to="/register">Register</router-link>
        </li>
        <li v-if="this.$store.getters.authStatus=='success'" class="nav-item justify-content-md-right">
          <a class="nav-link" href="" v-on:click="logout">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>

export default {
  data () {
    return {
    }
  },

  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>
