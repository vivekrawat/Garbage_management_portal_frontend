<template>
    <v-dialog
    v-model = "edit"
    persistent
    max-width="500px"
    @click:outside="$emit('change', false)"
    >
        <v-card>
            <v-card-title>
                <span class="headline grey--text text--darken-2">
                    Login as a {{type}}
                </span>
            </v-card-title>
            <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field label="Email" v-model="data.email" prepend-icon="mdi-at"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Password" v-model.lazy="data.password" prepend-icon="mdi-lock" type="password"></v-text-field>
                    </v-col>
                    <p class="subtitle red--text" v-if="errorMessage">
                    *email or password incorrect
                    </p>
                </v-row>
            </v-container>
            </v-card-text>
            <v-card-actions>
                <v-btn
                color="blue darken-1"
                dark
                @click="submit"
                >
                Login
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
  props: ['edit', 'type'],
  model: {
    prop: 'edit',
    event: 'change'
  },
  data () {
    return {
      errorMessage: false,
      data: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      console.log(this.$store.state.url)
      fetch(this.$store.state.url + 'api/' + this.type.toLowerCase() + '/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(this.data)
      })
        .then((res) => {
          if (res.ok) {
            this.$emit('change', false)
            this.$store.commit('setUserType', this.type)
            this.$emit('change', false)
            // this.$router.replace({ path: 'items' })
            return res.json()
          } else {
            this.errorMessage = true
          }
        })
        .then(data => {
          console.log(data)
          localStorage.setItem('token', data.accessToken)
          this.$store.state.user.name = data.accessToken
          localStorage.setItem('id', data.id)
          this.$store.commit('setUserId', data.id)
          localStorage.setItem('name', data.name)
          this.$store.state.user.name = data.name
          localStorage.setItem('email', data.email)
          this.$store.state.user.email = data.email
          localStorage.setItem('type', this.type)
          this.$router.replace({ path: 'items' })
        })
    },
    submit () {
      this.login()
    }
  }
}
</script>
