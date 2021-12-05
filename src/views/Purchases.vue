<template>
  <v-card elevation="1" class="ma-1">
    <v-card-title>
      Purchases
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="getItems"
      :search="search"
    >
    <template v-slot:item.itemimage="{ item }">
        <v-img
        :src="item.itemimage"
        height="150"
        width="200"
        />
    </template>
    <template v-slot:item.updatedAt="{ item }">
        {{item.updatedAt.slice(0,10)}}
    </template>
    <template v-slot:item.actions="{ item }">
        <v-btn @click="moveToHistory(item.id)" primary small>
            Move to History
        </v-btn>
    </template>
    </v-data-table>
  </v-card>
</template>
<script>
export default {
  data () {
    return {
      search: '',
      headers: [
        {
          text: 'Item',
          align: 'start',
          sortable: false,
          value: 'itemimage',
          class: 'font-weight-medium body-1'
        },
        { text: 'Title', value: 'title', class: 'font-weight-medium body-1' },
        { text: 'Purchase Date', value: 'updatedAt', class: 'font-weight-medium body-1' },
        { text: 'Price', value: 'expectedprice', class: 'font-weight-medium body-1' },
        { text: 'ItemType', value: 'itemtype', class: 'font-weight-medium body-1' },
        { text: 'Address', value: 'address', class: 'font-weight-medium body-1' },
        { text: 'Zip Code', value: 'zipcode', class: 'font-weight-medium body-1' },
        { text: 'Actions', value: 'actions', class: 'font-weight-medium body-1' }
      ]
    }
  },
  computed: {
    getItems () {
      console.log(this.$store.state.itemsSold)
      return this.$store.state.itemsSold
    }
  },
  methods: {
    moveToHistory (id) {
      fetch(this.$store.state.url + 'api/item/moveToHistory/' + id, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
      })
        .then((res) => {
          // return res.json()
        })
        .then((data) => {
          // this.$store.state.bids.push(data)
        })
    }
  },
  mounted () {
    this.$store.dispatch('loadPurchasedItems')
  }
}
</script>
