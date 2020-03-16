<template>
  <div class="container">
    <div class="jumbotron mt-5">
      <div class="col-sm-8 mx-auto">
        <h1 class="text-center">PROFILE</h1>
      </div>
      <table class="table col-md-6 mx-auto">
        <tbody>
          <tr>
            <td>Login:</td>
            <td>{{LOGIN}}</td>
          </tr>
          <tr>
            <td>Emp id:</td>
            <td>{{EMP_ID}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import router from '../router'
import axios from 'axios'

export default {
  data () {
    const token = localStorage.usertoken

    return {
      LOGIN: '',
      EMP_ID: '',
      token: token
    }
  },
  methods: {
    getuser () {
      axios.get('/users/profile', {
        headers: { 'Authorization': this.token }
      }).then(res => {
        this.LOGIN = res.data.LOGIN
        this.EMP_ID = res.data.EMP_ID
      }).catch(err => {
        console.log(err)
        router.push({ name: 'Login' })
      })
    }
  },
  updated () {
    console.log('updated')
  },
  mounted () {
    this.getuser()
  }
}
</script>
