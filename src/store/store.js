import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    url: process.env.VUE_APP_URL,
    uploadCareKey: process.env.VUE_APP_KEY,
    user: {
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      token: localStorage.getItem('token'),
      id: localStorage.getItem('id'),
      type: localStorage.getItem('type')
    },
    newItems: [],
    items: [],
    bids: [],
    itemsSold: [],
    itemsHistory: []
  },
  mutations: {
    setUserId (state, id) {
      state.user.id = id
    },
    setUserType (state, type) {
      state.user.type = type
    },
    addingItem (state, item) {
      state.items.push(item)
    }
  },
  actions: {
    loadItems () {
      fetch(this.state.url + 'api/item', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*',
          'content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token')
        }
      })
        .then(response => response.json())
        .then(data => {
          this.state.items = data
          // console.log(data)
        })
    },
    loadBids (action, id) {
      fetch(this.state.url + 'api/bid/' + id, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*',
          'content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token')
        }
      })
        .then(response => response.json())
        .then(data => {
          this.state.bids = data
          // console.log(data)
        })
    },
    loadItemsById () {
      fetch(this.state.url + '/api/item/' + store.state.user.id, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*',
          'content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token')
        }
      })
        .then(response => response.json())
        .then(data => {
          this.state.items = data
          // console.log(store.state.user.id)
          // console.log(data)
        })
    },
    addItem (action, details) {
      fetch(this.state.url + '/api/item/additem', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'x-access-token': localStorage.getItem('token')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(details)
      })
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          this.state.items.push(data)
        })
    },
    addFeedback (action, feedback) {
      fetch(this.state.url + '/api/feedback', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'x-access-token': localStorage.getItem('token')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(feedback)
      })
        .then((res) => {
          // return res.json()
        })
        .then((data) => {
        })
    },
    loadSoldItems () {
      fetch(this.state.url + '/api/item/sold/' + store.state.user.id, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*',
          'content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token')
        }
      })
        .then(response => response.json())
        .then(data => {
          this.state.itemsSold = data
          // console.log(data)
          // console.log(typeof data)
        })
    },
    loadPurchasedItems () {
      fetch(this.state.url + '/api/item/purchases/' + store.state.user.id, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*',
          'content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token')
        }
      })
        .then(response => response.json())
        .then(data => {
          this.state.itemsSold = data
          // console.log(data)
          // console.log(typeof data)
        })
    },
    loadHistoryItemsForSeller () {
      fetch(this.state.url + '/api/item/sellerHistory/' + store.state.user.id, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*',
          'content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token')
        }
      })
        .then(response => response.json())
        .then(data => {
          this.state.itemsHistory = data
          // console.log(data)
        })
    },
    loadHistoryItemsForPurchaser () {
      fetch(this.state.url + '/api/item/PurchaserHistory/' + store.state.user.id, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*',
          'content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token')
        }
      })
        .then(response => response.json())
        .then(data => {
          this.state.itemsHistory = data
          // console.log(data)
        })
    }
  }
})
