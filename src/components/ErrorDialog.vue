<template>
   <v-dialog v-model="errorDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Error</span>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>{{ errorMessage }}</v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat @click.stop="errorDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  computed: {
    errorDialog: {
      get: function () {
        return this.$store.getters.errorDialog
      },
      set: function () {
        this.$store.dispatch('closeErrorDialog')
      }
    },
    errorMessage: {
      get: function () {
        return this.$store.getters.errorMessage
      }
    }
  }
}
</script>