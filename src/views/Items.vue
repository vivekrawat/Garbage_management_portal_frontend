<template>
  <v-container fluid class="ma-1">
    <addItemDialog
    v-model="dialog"
    :addItem="addItem"
    @save="onSaveItem($event)"
    />
    <v-card elevation="0">
        <v-card-title>
          <v-row>
            <v-col md="8" cols="0">
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search by Item Type"
              single-line
              hide-details
              dense
              ></v-text-field>
            </v-col>
          </v-row>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col v-for="(item,index) in getItems"
            :key="index" sm="3" md="2" cols="6">
            <item
            :item="item"/>
          </v-col>
          <v-col v-if="this.$store.state.user.type === 'Seller' " sm="3" md="2" cols="6">
            <v-sheet class="d-flex itemColour justify-center align-center ma-1 mx-1" height="370px">
              <v-btn outlined @click="addingItem" text small fab>
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-sheet>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import addItemDialog from '../components/addItemDialog.vue'
import item from '../components/item.vue'
// import Vue from 'vue'
export default {
  data () {
    return {
      ind: 0,
      dialog: false,
      search: '',
      addItem: {
        status: 'notSold',
        sellerid: this.$store.state.user.id,
        itemimage: '',
        title: '',
        expectedprice: '',
        estimatedweight: '',
        address: '',
        zipcode: '',
        itemtype: ''
      }
    }
  },
  components: {
    addItemDialog,
    item
  },
  computed: {
    getItems () {
      // console.log(this.$store.state.items)
      return this.$store.state.items
    }
  },
  mounted () {
    if (this.$store.state.user.type === 'Company') {
      this.$store.dispatch('loadItems')
    } else {
      this.$store.dispatch('loadItemsById')
    }
    // console.log(this.$store.state.user.id)
    // console.log(this.$store.state.user.name)
    // console.log(this.$store.state.user.email)
  },
  methods: {
    resetItemValues () {
      this.addItem.itemimage = ''
      this.addItem.title = ''
      this.addItem.expectedprice = ''
      this.addItem.estimatedweight = ''
      this.addItem.address = ''
      this.addItem.zipcode = ''
      this.addItem.itemtype = ''
    },
    addingItem () {
      this.ind += 1
      this.resetItemValues()
      this.dialog = true
    },
    onSaveItem (keepers) {
      this.$store.dispatch('addItem', keepers)
    }
  }
}
</script>
