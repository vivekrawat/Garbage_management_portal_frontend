<template>
    <v-card
    elevation="0"
    class="ma-1 itemColour pa-1 mx-1"
    height="370"
    >
    <showingBidsDialog
    v-model="bidsDialog"
    :title = "item.title"
    :id = "item.id"
    />
    <v-img
    height="170px"
    :src="item.itemimage">
    </v-img>
    <v-sheet class="itemColour" height="156px">
    <v-sheet class="itemColour">
      <span class="font-weight-medium">Item Title:</span>
      {{item.title}}
    </v-sheet>
    <v-sheet class="itemColour">
      <span class="font-weight-medium">Expected Price:</span>
      {{item.expectedprice}}
    </v-sheet>
    <v-sheet class="itemColour">
      <span class="font-weight-medium">Estimated Weight:</span>
      {{item.estimatedweight}}
    </v-sheet>
    <v-sheet class="itemColour">
      <span class="font-weight-medium">Address:</span>
      {{item.address}}
    </v-sheet>
     <v-sheet class="itemColour">
      <span class="font-weight-medium">Item Type:</span>
      <v-chip class="blue white--text">
        {{item.itemtype}}
      </v-chip>
    </v-sheet>
    </v-sheet>
    <v-spacer/>
    <v-btn small @click="showBids" dark class="my-2 primary">
      {{bidsButton}}
    </v-btn>
    </v-card>
</template>
<script>
import showingBidsDialog from './showingBidsDialog'
export default {
  props: ['item'],
  components: {
    showingBidsDialog
  },
  data () {
    return {
      bidsDialog: false,
      bidsButton: ''
    }
  },
  computed: {
    /*
    dataUrl () {
      return 'data:image/jpeg;base64,this.item.itemImage'
    } */
  },
  methods: {
    showBids () {
      this.$store.dispatch('loadBids', this.item.id)
      this.bidsDialog = true
    }
  },
  mounted () {
    if (this.$store.state.user.type === 'Seller') this.bidsButton = 'View Bids'
    else this.bidsButton = 'Add Bids'
  }
}
</script>
