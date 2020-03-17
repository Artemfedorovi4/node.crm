<template>
  <div>
    <div class="container">
      <div class="jumbotron mt-5 ">
        <div class="col-sm-8 mx-auto">
          <h1 class="text-center">Emploees</h1>
        </div>
        <div class="table-responsive-md">
          <v-dialog v-model="dialog" max-width="500px">
          </v-dialog>
          <b-table
            striped
            hover
            :items="items"
            :fields="fields"
            :per-page="perPage"
            :current-page="currentPage"
            :busy="isBusy"
            @row-dblclicked="ed"
            small>
            <template v-slot:table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
            <template v-slot:cell(actions)="row">
              <b-button v-b-modal.edit-empl-modal v-if="role=='Manager'" size="sm" class="mr-1">
                Edit
              </b-button>
              <b-button size="sm" @click="row.toggleDetails">
                Del
              </b-button>
            </template>
          </b-table>
            <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
            ></b-pagination>
            <!-- Info modal -->
          <b-modal id="edit-empl-modal" :title="editModal.title" ok-only @hidden="resetInfoModal">
            <pre>{{ editModal.content }}</pre>
          </b-modal>
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
      isBusy: false,
      perPage: 10,
      currentPage: 1,
      role: '',
      fields: [
        { key: 'empl_id', label: 'ID', sortable: true, sortDirection: 'desc' },
        { key: 'role', label: 'Role', sortable: true, sortDirection: 'desc' },
        { key: 'last_name', label: 'Last Name', sortable: true, sortDirection: 'desc' },
        { key: 'first_name', label: 'First Name', sortable: true, sortDirection: 'desc' },
        { key: 'email', label: 'Email', sortable: true, sortDirection: 'desc' },
        { key: 'phone_number', label: 'Phone number', sortable: true, sortDirection: 'desc' },
        { key: 'actions', label: 'Actions', sortable: false, sortDirection: 'desc' }
      ],
      items: [],
      editModal: {
        id: 'edit-modal',
        title: 'Modal for edit data',
        content: 'content'
      },
      dialog: false
    }
  },
  computed: {
    rows () {
      return this.items.length
    }
  },
  methods: {
    info (item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal () {

    },
    del (id) {
      let row = this.items.findIndex((item) => {
        return item.mess === id
      })
      console.log(this.items[row])
    },
    ed (record, index) {
      // let res = this.items.findIndex((itm) => {
      //   return itm.USER_ID === id
      // })
      console.log(record)
    },
    update () {
      this.isBusy = true
      axios.post('/users/emploeers').then(res => {
        console.log(res)
        this.items = res.data
        this.isBusy = false
        // console.log(res.data.splice(0, 10))
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.role = this.$store.getters.empRole
    console.log(this.$store.getters)
    this.update()
  }
}
</script>
