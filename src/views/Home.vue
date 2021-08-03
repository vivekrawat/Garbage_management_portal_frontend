<template>
  <v-container fluid>
    <login
    v-model = 'loginDialog'
    :type = 'type'
    />
    <signup
    v-model = 'signupDialog'
    :type = 'type'
    />
    <!--home content-->
    <v-card class="mt-4" elevation="0">
      <v-row class="">
        <v-col class="d-none d-lg-flex" lg="2"></v-col>
        <v-col lg="4" md="6" sm="12" class="mt-16 pt-16">
          <v-card elevation="0" class="pt-10 blue-grey--text text--darken-2 display-1">
            Selling Recyclable Waste to Companies
          </v-card>
          <v-row>
            <v-col sm="6" class="mt-11">
              <v-card elevation="0 headline font-weight-medium">
                For Companies
              </v-card>
              <v-card class="mt-8" elevation="0" height="150px">
                We are the companies responsible for the purchasing
                of recyclable goods from the customes at reasonable prices.
              </v-card>
              <v-btn @click="companySignup" class="mr-2 success my-2">
                Sign up
              </v-btn>
              <v-btn @click="companyLogin" class="success mx-2 my-2">
                Login
              </v-btn>
            </v-col>
            <v-col sm="6" class="mt-11">
              <v-card elevation="0 headline font-weight-medium">
                For Waste Sellers
              </v-card>
              <v-card class="mt-8 text-left" elevation="0" height="150">
                Join to sell your recycle waste to the companies. And
                choose among the best prices offered.
              </v-card>
              <v-btn @click="sellerSignup" class="success mr-2 my-2">
                Sign up
              </v-btn>
              <v-btn @click="sellerLogin" class="success mx-2 my-2">
                Login
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="d-none d-lg-flex d-md-flex" cols="6">
          <v-img
          src="../assets/image2.png"
          height="100%"
          max-width="43vw"
          ></v-img>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import login from '../components/login.vue'
import signup from '../components/signup.vue'
export default {
  name: 'Home',
  data: () => ({
    test: 'login',
    loginDialog: false,
    signupDialog: false,
    type: ''
  }),
  components: {
    login,
    signup
  },
  methods: {
    companySignup  () {
      this.type = 'Company'
      this.signupDialog = true
    },
    sellerSignup () {
      this.type = 'Seller'
      this.signupDialog = true
    },
    companyLogin  () {
      this.$store.state.user.type = 'Company'
      this.type = 'Company'
      this.loginDialog = true
    },
    sellerLogin () {
      this.$store.state.user.type = 'Seller'
      this.type = 'Seller'
      this.loginDialog = true
    }
  }
}
</script>
