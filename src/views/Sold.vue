<template>
  <v-card elevation="1" class="ma-1">
    <v-card-title>
      Sold Items
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
        { text: 'Sold On', value: 'updatedAt', class: 'font-weight-medium body-1' },
        { text: 'Price', value: 'expectedprice', class: 'font-weight-medium body-1' },
        { text: 'ItemType', value: 'itemtype', class: 'font-weight-medium body-1' },
        { text: 'Company', value: 'companyname', class: 'font-weight-medium body-1' }
      ]
      // items: this.$store.state.itemsSold
    }
  },
  computed: {
    getItems () {
      console.log(this.$store.state.itemsSold)
      return this.$store.state.itemsSold
    }
  },
  mounted () {
    this.$store.dispatch('loadSoldItems')
  }
}
</script>
