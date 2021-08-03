import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        itemColour: '#99cfe0',
        headerColour: '#008080'
      },
      dark: {
        headerColour: '#162936',
        itemColour: '#000000'
      }
    }
  }
})
