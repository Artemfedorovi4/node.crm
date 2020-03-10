<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <form v-on:submit.prevent="login">
          <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
          <div class="form-group">
            <label for="LOGIN">Login</label>
            <input type="LOGIN" v-model="LOGIN" class="form-control" name="LOGIN" placeholder="Enter login">
          </div>
          <div class="form-group">
            <label for="PASSWORD">Password</label>
            <input type="PASSWORD" v-model="PASSWORD" class="form-control" name="PASSWORD" placeholder="Password">
          </div>
          <button type="submit" class="btn btn-lg btn-primary btn-block">Sign in</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import EventBus from './EventBus'

export default {
  data () {
    return {
      LOGIN: '',
      PASSWORD: ''
    }
  },

  methods: {
    login () {
      axios.post('/users/login',
        {
          LOGIN: this.LOGIN,
          PASSWORD: this.PASSWORD
        }
      ).then((res) => {
        localStorage.setItem('usertoken', res.data)
        this.LOGIN = ''
        this.PASSWORD = ''
        router.push({ name: 'Profile' })
      }).catch((err) => {
        console.log(err)
      })
      this.emitMethod()
    },
    emitMethod () {
      EventBus.$emit('logged-in', 'loggedin')
    }
  }
}
</script>
