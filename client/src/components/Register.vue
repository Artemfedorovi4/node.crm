<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <form v-on:submit.prevent="register">
          <h1 class="h3 mb-3 font-weight-normal">Register</h1>
          <div class="form-group">
            <label for="name">Login</label>
            <input type="text" v-model="LOGIN" class="form-control" name="first_name" placeholder="Enter Login">
          </div>
          <div class="form-group">
            <label for="email">Emploeer id</label>
            <input type="text" v-model="EMP_ID" class="form-control" name="email" placeholder="Enter yuor id">
          </div>
          <div class="form-group">
            <label for="PASSWORD">Password</label>
            <input type="password" v-model="PASSWORD" class="form-control" name="password" placeholder="Password">
          </div>
          <button type="submit" class="btn btn-lg btn-primary btn-block">Register!</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import router from '../router'

export default {
  data () {
    return {
      LOGIN: '',
      EMP_ID: '',
      PASSWORD: ''
    }
  },

  methods: {
    register () {
      axios.post('/users/register',
        {
          LOGIN: this.LOGIN,
          EMP_ID: this.EMP_ID,
          PASSWORD: this.PASSWORD
        }
      ).then((res) => {
        router.push({ name: 'Login' })
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    }
  }

}
</script>
