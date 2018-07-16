<template>
  <div>
    <v-text-field
    label="Select .csv"
    @click='pickFile'
    v-model='fileName'
    prepend-icon='attach_file'
  ></v-text-field>
  <input
    type="file"
    style="display: none"
    ref="file"
    accept=".csv"
    @change="handleFileUpload"
  >
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'upload-button',
    computed: {
      ...mapGetters([
        'requester'
      ])
    },
    data: () => ({
      fileName: '',
      fileUrl: '',
      file: ''
    }),
    methods: {
      pickFile () {
          this.$refs.file.click ()
      },
      handleFileUpload() {
        this.$store.dispatch('setFile', this.$refs.file.files[0])
        this.file = this.$refs.file.files[0]
        this.fileName = this.file.name
      }
    }
  }
</script>

<style scoped>

</style>