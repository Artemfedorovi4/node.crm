<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <form v-on:submit.prevent="login">
          <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
          <v-alert
            color="error"
            :value="error"
            icon="close"
            v-if="error"
          >
            The username or password are incorrect {{error}}
          </v-alert>
          <div class="form-group">
            <label for="LOGIN">Login</label>
            <input type="LOGIN" v-model="LOGIN" class="form-control" name="LOGIN" placeholder="Enter login">
          </div>
          <div class="form-group">
            <label for="PASSWORD">Password</label>
            <input type="password" v-model="PASSWORD" class="form-control" name="PASSWORD" placeholder="Password">
          </div>
          <button type="submit" class="btn btn-lg btn-primary btn-block">Sign in</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import router from '../router'
// import store from '../store/store.js'

export default {
  data () {
    return {
      LOGIN: '',
      PASSWORD: '',
      error: false
    }
  },

  methods: {
    login () {
      this.$store.dispatch('login', {
        LOGIN: this.LOGIN,
        PASSWORD: this.PASSWORD
      }).then(success => {
        router.push({name: 'Emploeers'})
      }).catch(error => {
        console.log(error)
        this.error = true
      })
      // axios.post('/users/login',
      //   {
      //     LOGIN: this.LOGIN,
      //     PASSWORD: this.PASSWORD
      //   }
      // ).then((res) => {
      //   console.log(res)
      //   localStorage.setItem('usertoken', res.data)
      //   this.LOGIN = ''
      //   this.PASSWORD = ''
      //   if (res) {
      //     this.emitMethod()
      //   } else {
      //     localStorage.removeItem('usertoken')
      //   }
      // }).catch((err) => {
      //   console.log(err)
      // })
    }
  }
}
</script>
