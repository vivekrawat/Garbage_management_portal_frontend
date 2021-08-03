<template>
  <div>
    <v-dialog
      v-model = "edit"
      persistent
      max-width="800px"
      @click:outside="$emit('change', false)"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Feedback</span>
          <v-spacer/>
          <v-hover v-slot="{ hover }">
          <v-card :elevation="hover ? 5 : 0" :class="{ 'on-hover': hover }" class="px-2" @click="$emit('change', false)">
            <v-icon color="grey darken-3">mdi-close-thick</v-icon>
          </v-card>
          </v-hover>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="12"
              >
              <span class="subtitle-1">How would you rate your experience with our website?
                </span>
              </v-col>
              <v-col
                cols="12"
                md="12"
              >
              <v-chip v-for="btn in btns" :key="btn.no"
              elevation="4"
              small
              class="ma-1 pa-4 body-1 font-weight-bold white--text"
              v-bind:class="adjustingintensity(value.rating===btn.no,btn.no)"
              font-weight-bold
              v-on:click="value.rating=btn.no"
              >{{btn.no}}</v-chip>
              </v-col>
              </v-row>
              <v-row justify="space-between">
                <v-col cols="4">
                  <span>0- very poor</span>
                </v-col>
                <v-col cols="4">
                  <span>10- excellent</span>
                </v-col>
              </v-row>
              <v-row>
              <v-col
                cols="9"
              >
                <v-textarea
                  outlined
                  :hover=true
                  v-model="value.description"
                  no-resize
                  height="200px"
                  label="What do you like or dislike the most?"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="$emit('change', false)"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="submit"
          >
            Send
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['edit', 'value'],
  model: {
    prop: 'edit',
    event: 'change'
  },
  data: () => ({
    btns: [
      { no: 0 }, { no: 1 }, { no: 2 }, { no: 3 }, { no: 4 }, { no: 5 }, { no: 6 }, { no: 7 }, { no: 8 }, { no: 9 }, { no: 10 }
    ]
  }),
  methods: {
    submit () {
      this.value.id = this.$store.state.user.id
      this.value.name = this.$store.state.user.name
      this.value.type = this.$store.state.user.type
      this.$emit('change', false)
      this.$emit('save', this.value)
    },
    adjustingintensity (val, no) {
      if (no < 7 && val) {
        return 'red darken-3'
      }
      if (no < 7 && !val) {
        return 'red lighten-2'
      }
      if (no >= 7 && no < 9 && val) {
        return 'orange darken-1'
      }
      if (no >= 7 && no < 9 && !val) {
        return 'orange lighten-2'
      }
      if (no <= 7 && val) {
        return 'red darken-3'
      }
      if (no <= 7 && !val) {
        return 'red lighten-1'
      }
      if (no > 8 && val) {
        return 'green darken-3'
      }
      if (no > 8 && !val) {
        return 'green lighten-2'
      }
    }
  }
}
</script>
