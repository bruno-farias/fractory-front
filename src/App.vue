<template>
  <v-app>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-slide-y-transition mode="out-in">
        <router-view/>
      </v-slide-y-transition>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer>
    <Loader/>
    <snack-bar/>
  </v-app>
</template>

<script>
import Loader from './components/Loader'
import SnackBar from './components/SnackBar'

export default {
  components: {
    Loader,
    SnackBar
  },
  name: 'App',
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Fractory.co'
    }
  }
}
</script>
