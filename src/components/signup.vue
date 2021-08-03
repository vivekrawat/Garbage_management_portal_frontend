<template>
    <v-dialog
    v-model = "edit"
    persistent
    max-width="600px"
    @click:outside="$emit('change', false)"
    >
        <v-card>
            <v-card-title>
                <span class="headline grey--text text--darken-2">
                    Sign Up as a {{type}}
                </span>
            </v-card-title>
            <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-if="dispCompany()" label="Company Name" v-model="data.name" prepend-icon="mdi-office-building"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-if="!dispCompany()" label="Name" v-model="data.name" prepend-icon="mdi-office-building"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Email" v-model="data.email" prepend-icon="mdi-at"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Password" v-model.lazy="data.password" prepend-icon="mdi-lock" type="password"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Confirm Password" v-model.lazy="data.confirmPassword" prepend-icon="mdi-lock" type="password"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Address" v-model="data.address" prepend-icon="mdi-home"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field type="number" label="Zip Code" v-model="data.zipcode" prepend-icon="mdi-map-marker-multiple"></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            </v-card-text>
            <v-card-actions>
                <v-btn
                color="blue darken-1"
                dark
                @click="submit"
                >
                Sign Up
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
      userType: this.type.toLowerCase(),
      data: {
        name: '',
        email: '',
        password: '',
        address: '',
        zipcode: ''
      }
    }
  },
  methods: {
    signup () {
      fetch('http://localhost:3000/api/' + this.type.toLowerCase() + '/signup', {
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
          }
        })
    },
    submit () {
      this.signup()
    },
    dispCompany () {
      if (this.type === 'Company') return true
      else return false
    }
  }
}
</script>
