<template>
    <div>
        <v-dialog
        v-model="edit"
        max-width="800px"
        @click:outside="$emit('change',false)"
        >
        <v-card>
            <v-card-title class="green lighten-1">
                <span class="headline">Add Item</span>
                <v-spacer/>

                <v-btn @click="$emit('change',false)" small class="">
                    <v-icon color="grey darken-3">mdi-close-thick</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text class="mt-16">
                <v-row>
                    <!--
                    <v-col cols="12">
                        <v-file-input
                        :rules="rules"
                        v-model="addItem.itemImage"
                        accept="image/png, image/jpeg"
                        prepend-icon="mdi-camera"
                        label="Item Image"
                        dense
                        @change="handleFiles(addItem.itemImage)"
                        ></v-file-input>
                    </v-col>-->
                    <v-col cols="6">
                        <v-text-field
                        hide-details
                        dense
                        label="Image Name"
                        placeholder="Image Name"
                        v-model="imageName"
                        disabled
                        />
                    </v-col>
                    <v-col cols="6">
                        <uploadcare :publicKey="key" @click="onClick" @success="onSuccess" @error="onError">
                        <v-btn>Upload Image</v-btn>
                        </uploadcare>
                    </v-col>
                    <v-col cols="6" v-if="addItem.itemimage !== ''">
                        <v-img
                        :src="addItem.itemimage"
                        height="200"
                        width="200"/>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                        hide-details
                        dense
                        label="Item Title"
                        placeholder="Item Title"
                        v-model="addItem.title">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-combobox
                        :items="genre"
                        label="Item Type"
                        chips
                        hide-details
                        dense
                        v-model="addItem.itemtype">
                        ></v-combobox>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                        label="Expected price"
                        hide-details
                        dense
                        type="number"
                        v-model="addItem.expectedprice"
                        placeholder="Expected Price">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                        label="Estimated Weight"
                        hide-details
                        dense
                        type="number"
                        v-model="addItem.estimatedweight"
                        placeholder="Estimated Weight">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                        hide-details
                        label="Address"
                        dense
                        v-model="addItem.address"
                        placeholder="Address">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                        label="zip code"
                        hide-details
                        dense
                        type="number"
                        v-model="addItem.zipcode"
                        placeholder="zip code">
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn dark class="primary" @click="submit">Add</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </div>
</template>
<script>
import Uploadcare from 'uploadcare-vue'
export default {
  props: ['edit', 'addItem'],
  model: {
    prop: 'edit',
    event: 'change'
  },
  components: {
    Uploadcare
  },
  data: () => ({
    key: this.$store.state.uploadCareKey,
    imageName: '',
    rules: [
      addItem => !addItem || addItem.size < 2000000 || 'Avatar size should be less than 2 MB!'
    ],
    genre: ['metal', 'plastics', 'electronics', 'paper']
  }),
  methods: {
    /*
    handleFiles (file) {
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.addItem.itemImage = reader.result
      }
    }, */
    onError (data) {
      console.log(data)
    },
    onClick () {
      console.log('this has bee clicked')
    },
    onSuccess (data) {
      this.addItem.itemimage = data.cdnUrl
      this.imageName = data.name
      console.log(data)
    },
    submit () {
      this.$emit('change', false)
      this.$emit('save', this.addItem)
    }
  }
}
</script>
