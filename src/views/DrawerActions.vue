<template>
    <v-list dense>
        <Feedback
        v-model="feedbackDialog"
        :value="editFeedback"
        @save="onSaveFeedback($event)"
        />
        <v-divider></v-divider>
        <v-list-item @click="onAddFeedback" link class="pa-0; px-1">
          <v-list-item-content>
          <v-list-item-icon class="mb-0">
            <v-icon
              color="grey lighten-2"
              class="mx-auto"
            >
              mdi-state-machine
            </v-icon>
          </v-list-item-icon>
            <v-list-item-title class="text-center grey--text text--lighten-2">Feedback</v-list-item-title>
          </v-list-item-content>
      </v-list-item>
    </v-list>
</template>
<script>
import Feedback from './Feedback'
export default {
  data () {
    return {
      feedbackDialog: false,
      editFeedback: {
        id: '',
        rating: '',
        name: '',
        type: '',
        description: ''
      }
    }
  },
  components: {
    Feedback
  },
  methods: {
    onAddFeedback () {
      this.feedbackDialog = true
    },
    onSaveFeedback (value) {
      this.$store.dispatch('addFeedback', value)
    }
  }
}
</script>
