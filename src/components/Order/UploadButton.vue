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
      },
      submitFile() {
        let formData = new FormData();
        formData.append('order', this.file);
        formData.append('email', this.requester.email)
        this.axios.post('http://localhost/api/order/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
      },
    }
  }
</script>

<style scoped>

</style>