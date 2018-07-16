<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex xs10 offset-xs1>
        <v-stepper v-model="formStep">

          <v-stepper-header>
            <v-stepper-step :complete="formStep > 1" step="1">Upload</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="formStep > 2" step="2">Review</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3">Confirm</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>

            <v-stepper-content step="1">
              <v-card class="mb-5" color="" height="100%">
                <upload-button title="Browse"></upload-button>
              </v-card>
              <v-btn color="primary" @click="uploadFile()">Next</v-btn>
              <v-btn flat @click="leave">Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card class="mb-5">
                <review-table></review-table>
                <v-spacer></v-spacer>
                <v-alert
                  :value="this.errors.length > 0"
                  type="error"
                >
                  Your have {{this.errors.length}} items missing some info. Please review!
                </v-alert>
              </v-card>
              <v-btn color="primary" :disabled="errors.length > 0" @click="formStep = 3">Next</v-btn>
              <v-btn flat @click="goBack">Go Back</v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card class="mb-5" height="200px">
                <h2>We received your order, thanks! :)</h2>
              </v-card>
              <v-btn color="primary" @click="leave">Finish</v-btn>
            </v-stepper-content>

          </v-stepper-items>
        </v-stepper>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UploadButton from "./UploadButton"
import ReviewTable from './ReviewTable'
import { mapGetters } from 'vuex'

export default {
  components: {
    UploadButton,
    ReviewTable
  },
  computed: {
    ...mapGetters([
      'fileUpload',
      'errors'
    ]),
    formStep: {
      get () {
        return this.$store.getters.formStep
      },
      set (value) {
        this.$store.dispatch('setFormStep', value)
      }
    }
  },
  methods: {
    uploadFile: function() {
      if (this.fileUpload !== null) {
        this.$store.dispatch('uploadFile')
      } else {
        this.$store.dispatch('openSnackbar', {message: 'File is required'})
      }
    },
    leave () {
      this.$router.push('/')
    },
    goBack () {
      this.$store.dispatch('setFormStep', (this.formStep > 1) ? this.formStep - 1 : 1)
    }
  }
}
</script>

<style scoped>
</style>
