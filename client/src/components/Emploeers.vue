<template>
  <div>
  <div class="container">
    <div class="jumbotron mt-5 ">
      <div class="col-sm-8 mx-auto">
        <h1 class="text-center">Emploees</h1>
      </div>
      <div class="table-responsive-md">
        <b-table
          striped
          hover
          :id="emploeer_table"
          :items="items"
          :per-page="perPage"
          :current-page="currentPage"
          small></b-table>
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="emploeer_table"
          ></b-pagination>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      perPage: 10,
      currentPage: 1,
      headers: [],
      items: []
    }
  },
  computed: {
    rows () {
      return this.items.length
    }
  },
  methods: {
    del (id) {
      let row = this.items.findIndex((item) => {
        return item.mess === id
      })
      this.items.splice(row, 1)
    },
    ed (id) {
      let res = this.items.findIndex((itm) => {
        return itm.USER_ID === id
      })
      this.items[res].setEMAIL('ahaha@mail.ru')
      // this.update
      console.log(this.items[res])
    },
    update () {
      axios.post('/users/emploeers').then(res => {
        this.items = res.data
        // console.log(res.data.splice(0, 10))
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.update()
  }
}
</script>
