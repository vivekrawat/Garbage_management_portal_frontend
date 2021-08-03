import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: {
      name: '',
      email: 'vivek',
      id: -1,
      type: ''
    },
    newItems: [],
    items: [],
    bids: [],
    itemsSold: [],
    itemsHistory: []
    /* items: [{ itemTitle: 'Broken Televison', estimatedWeight: 4, address: 'Punjabi Bagh delhi', expectedPrice: 220, itemType: ['electronics'], itemImage: 'https://thumbs.dreamstime.com/b/old-tv-broken-screen-12980673.jpg', orderDate: '2021-04-09', zipCode: 210343, companyName: 'EMZ limited' },
      { itemTitle: 'Broken Bucket', estimatedWeight: 1, address: 'shivaji park Delhi', expectedPrice: 80, itemType: ['metal'], itemImage: 'https://static.turbosquid.com/Preview/2019/09/13__08_55_52/bucket05.jpg1F2E9D0C-0F0C-4EC6-B45E-6C111BD41ED9DefaultHQ.jpg', orderDate: '2021-03-19', zipCode: 219301, companyName: 'EMR limited' },
      { itemTitle: 'Mobile Phones', estimatedWeight: 0.6, address: 'meerut UP', expectedPrice: 190, itemType: ['electronics'], itemImage: 'https://i2-prod.mirror.co.uk/incoming/article13420930.ece/ALTERNATES/s615b/0_Close-Up-Of-Broken-Phone.jpg', orderDate: '2021-02-07', zipCode: 201233, companyName: 'JMR Punchure' }
    ],
    items2: [{ itemTitle: 'Paper Waste', estimatedWeight: 2, address: 'Ragnagar Extension Ghaziabad', expectedPrice: 20, itemType: ['paper'], url: 'https://ismwaste.co.uk/images/recycling/mixed-paper.jpg', orderDate: '2021-05-09', zipCode: 210343, companyName: 'EMZ limited' }
    ],
    items3: [{ itemTitle: 'Old NewsPaper', estimatedWeight: 3, address: 'Ragnagar Extension Ghaziabad', expectedPrice: 20, itemType: ['paper'], url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREhbm5RMeuNHoqkkeMQRVztqm3ilEDgy3jWvcqeyRZTUe5aLRGHqFtNDKMpj50SU3R7FJuhvdFBFnLEw&usqp=CAU', orderDate: '2021-05-09', zipCode: 217343, companyName: 'EMR limited' }],
    bids: [{ user: 'NYM Limited', bid: 32 }, { user: 'PRA Jenkins', bid: 24 }]
    */
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
      fetch('http://localhost:3000/api/item', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*',
          'content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          this.state.items = data
          // console.log(data)
        })
    },
    loadBids (action, id) {
      fetch('http://localhost:3000/api/bid/' + id, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*',
          'content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          this.state.bids = data
          // console.log(data)
        })
    },
    loadItemsById () {
      fetch('http://localhost:3000/api/item/' + store.state.user.id, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*',
          'content-Type': 'application/json'
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
      fetch('http://localhost:3000/api/item/additem', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
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
      fetch('http://localhost:3000/api/feedback', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
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
      fetch('http://localhost:3000/api/item/sold/' + store.state.user.id, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*',
          'content-Type': 'application/json'
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
      fetch('http://localhost:3000/api/item/purchases/' + store.state.user.id, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*',
          'content-Type': 'application/json'
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
      fetch('http://localhost:3000/api/item/sellerHistory/' + store.state.user.id, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*',
          'content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          this.state.itemsHistory = data
          // console.log(data)
        })
    },
    loadHistoryItemsForPurchaser () {
      fetch('http://localhost:3000/api/item/PurchaserHistory/' + store.state.user.id, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*',
          'content-Type': 'application/json'
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
