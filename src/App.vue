<template>
  <v-app>
    <v-card>
    <v-app-bar
    app
    elevation="0"
    class="headerColour mt-0 pa-0"
    clipped-left
    >
      <v-toolbar-title class="headline font-weight-bold white--text">Garbage Management Portal</v-toolbar-title>
      <v-spacer/>
      <v-switch
        v-model="$vuetify.theme.dark"
        inset
        color="white"
        class="mt-4 mx-2"
      >
      <template v-slot:label>
        <span class="white--text">Toggle Theme</span>
      </template>
      </v-switch>
    <v-btn @click="toAbout" class="mx-2" dark v-show="$store.state.user.id === ''" outlined> About us</v-btn>
    <v-btn @click="logout" v-show="$store.state.user.id !== ''" class="body-1" dark outlined> Log Out</v-btn>
    <!--<v-btn @click="logout" fab small v-show="$store.state.user.id !== -1" class="body-1" dark color="primary"> {{$store.state.user.email[0].toUpperCase()}}</v-btn>-->
    </v-app-bar>
    </v-card>
    <v-navigation-drawer
      v-show="$store.state.user.id !== ''"
      width="95"
      clipped
      permanent
      color="headerColour"
      app
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
          v-model="group"
        >
          <v-list-item v-for="page in pages" :key="page.title" :to="page.route">
            <v-list-item-content>
              <v-list-item-icon class="mb-0">
              <v-icon
                color="grey lighten-2"
                class="mx-auto"
              >
              {{ page.icon }}
              </v-icon>
              </v-list-item-icon>
            <v-list-item-title class="text-center grey--text text--lighten-2">{{ page.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-show="$store.state.user.type === 'Company' " to="/purchases">
            <v-list-item-content>
              <v-list-item-icon class="mb-0">
              <v-icon
                color="grey lighten-2"
                class="mx-auto"
              >
              mdi-bag-personal
              </v-icon>
              </v-list-item-icon>
            <v-list-item-title class="text-center grey--text text--lighten-2">Purchases</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-show="$store.state.user.type === 'Seller' " to="/sold">
            <v-list-item-content>
              <v-list-item-icon class="mb-0">
              <v-icon
                color="grey lighten-2"
                class="mx-auto"
              >
              mdi-bag-personal
              </v-icon>
              </v-list-item-icon>
            <v-list-item-title class="text-center grey--text text--lighten-2">Sold</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <DrawerActions />
      </template>
    </v-navigation-drawer>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import DrawerActions from './views/DrawerActions'
export default {
  name: 'App',
  data: () => ({
    group: null,
    pages: [
      { icon: 'mdi-view-comfy', title: 'Items', route: '/items' },
      { icon: 'mdi-history', title: 'History', route: '/history' }
    ]
  }),
  watch: {
    group () {
      this.drawer = false
    }
  },
  methods: {
    getInitials () {
      return this.$store.state.user.email[0].toUpperCase()
    },
    logout () {
      this.$store.state.user.id = ''
      localStorage.setItem('id', '')
      localStorage.setItem('token', '')
      localStorage.setItem('email', '')
      localStorage.setItem('type', '')
      localStorage.setItem('name', '')
      this.$router.replace({ path: '/' })
    },
    toAbout () {
      this.$router.replace({ path: '/aboutus' })
    }
  },
  components: {
    DrawerActions
  }
}
</script>
