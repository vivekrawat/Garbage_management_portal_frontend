<template>
  <v-card elevation="1" class="ma-1">
    <v-card-title>
      History
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
      :items="items"
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
          class: 'body-1 font-weight-medium'
        },
        { text: 'Title', value: 'title', class: 'body-1 font-weight-medium' },
        { text: 'Order Date', value: 'updatedAt', class: 'body-1 font-weight-medium' },
        { text: 'Price', value: 'expectedprice', class: 'body-1 font-weight-medium' },
        { text: 'ItemType', value: 'itemtype', class: 'body-1 font-weight-medium' }
      ]
    }
  },
  computed: {
    items () {
      console.log(this.$store.state.itemsHistory)
      return this.$store.state.itemsHistory
    }
  },
  mounted () {
    if (this.$store.state.user.type === 'Seller') {
      this.$store.dispatch('loadHistoryItemsForSeller')
      this.headers.push({ text: 'Company Name', value: 'companyname', class: 'body-1 font-weight-medium' })
    } else {
      this.$store.dispatch('loadHistoryItemsForPurchaser')
      this.headers.push({ text: 'Address', value: 'address', class: 'body-1 font-weight-medium' })
      this.headers.push({ text: 'Zip Code', value: 'zipcode', class: 'body-1 font-weight-medium' })
    }
  }
}
</script>
