<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">

              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>

                  <v-text-field
                  prepend-icon="person"
                  name="email"
                  label="Email"
                  type="email"
                  :rules="emailRules"
                  v-model="email"
                  ></v-text-field>

                  <v-text-field
                  id="password"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  placeholder="Not validating"
                  type="password"
                  ></v-text-field>

                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  :disabled="!valid"
                  @click="submit"
                >Login</v-btn>

              </v-card-actions>

            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    email: '',
    emailRules: [
      v => !!v || "E-mail is required",
      v =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "E-mail must be valid"
    ]
  }),
  methods: {
    submit () {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('setRequester', this.email)
          this.$store.dispatch('setFormStep', 1)
        }
      },
  },
  props: {
    source: String
  }
};
</script>