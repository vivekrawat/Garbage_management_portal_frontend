<template>
    <div>
        <v-dialog
        v-model="edit"
        max-width="800px"
        @click:outside="$emit('change',false)"
        >
        <v-card>
            <v-card-title class="white--text blue lighten-1">
                <span class="headline">{{title}}</span>
                <v-spacer/>
                <v-btn @click="$emit('change',false)" small outlined class="">
                    <v-icon color="white">mdi-close-thick</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text class="my-6">
                <span class="body-1 pt-3 font-weight-medium"> Bids Till Now:
                </span>
                <div class="my-2" v-for="(bids,index) in getBids" :key="index">
                <v-sheet class="body-2 py-2 px-1" elevation="1">
                    <v-row>
                        <v-col cols="8">
                    {{bids.companyname}}
                        </v-col>
                        <v-col cols="4" align="right">
                        <span class="font-weight-medium">
                        Rs:</span> {{bids.bidprice}}
                        </v-col>
                    </v-row>
                    <v-btn v-show="$store.state.user.type === 'Seller'" @click="sell(bids.id,bids.companyid,bids.bidprice,bids.itemid,bids.companyname)" small dark class="px-3 mt-2 primary">Sell</v-btn>
                </v-sheet>
                </div>
            </v-card-text>
            <v-card-actions v-if="$store.state.user.type === 'Company'">
                <v-sheet width="100%">
                <v-text-field dense
                hide-details
                label="Bid Value"
                v-model="details.bidprice"
                type="number">
                </v-text-field>
                </v-sheet>
                <div>
                <v-btn dark class="primary" @click="submit">Add</v-btn>
                </div>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
  props: ['edit', 'title', 'id'],
  model: {
    prop: 'edit',
    event: 'change'
  },
  data: () => ({
    details: {
      companyid: '',
      companyname: '',
      itemid: '',
      bidprice: ''
    }
  }),
  computed: {
    getBids () {
      // console.log(this.$store.state.bids)
      return this.$store.state.bids
    }
  },
  mounted () {
    this.details.companyid = this.$store.state.user.id
    this.details.companyname = this.$store.state.user.name
    this.details.itemid = this.id
  },
  methods: {
    addBid () {
      fetch(this.$store.state.url + 'api/bid/addbid', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'x-access-token': localStorage.getItem('token')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(this.details)
      })
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          this.$store.state.bids.push(data)
        })
    },
    sell (id, companyid, bidprice, itemid, companyname) {
      fetch(this.$store.state.url + 'api/item/sell/' + this.id + '/' + companyid + '/' + companyname, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'x-access-token': localStorage.getItem('token')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
      })
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          // this.$store.state.bids.push(data)
        })
      // this.$store.dispatch('loadItemsById')
      this.$emit('change', false)
    },
    submit () {
      this.addBid()
      // console.log(this.id)
      this.$emit('change', false)
    }
  }
}
</script>
