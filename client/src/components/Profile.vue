<template>
  <div class="container">
    <div class="jumbotron mt-5">
      <div class="col-sm-8 mx-auto">
        <h1 class="text-center">PROFILE</h1>
      </div>
      <table class="table col-md-6 mx-auto">
        <tbody>
          <tr>
            <td>User Name:</td>
            <td>{{username}}</td>
          </tr>
          <tr>
            <td>Login:</td>
            <td>{{login}}</td>
          </tr>
          <tr>
            <td>Role:</td>
            <td>{{role}}</td>
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
    return {
      login: '',
      role: '',
      username: '',
      token: localStorage.token
    }
  },
  methods: {
    getuser () {
      axios.get('/users/profile', {
        headers: { 'Authorization': this.token }
      }).then(res => {
        this.login = res.data.LOGIN
        this.role = res.data.employee.roles_ref.ROLE_DESC
        this.username = res.data.employee.LAST_NAME + ' ' + res.data.employee.FIRST_NAME
      }).catch(err => {
        console.log(err)
        router.push({ name: 'Home' })
      })
    }
  },
  mounted () {
    this.getuser()
  }
}
</script>
