const state = {
  loading: false,
  message: 'Please wait...',
  progressColor: '#FFFFFF',
  errorDialog: false,
  errorMessage: '',
  snackbar: false,
  snackbarMessage: '',
  snackbarErrors: [],
  snackbarColor: 'red'
}

const mutations = {
  'SET_LOADING_STATUS' (state, status) {
    state.loading = status
  },
  'SET_LOADING_MESSAGE' (state, message) {
    state.message = message
  },
  'SET_PROGRESS_COLOR' (state, color) {
    state.color = color
  },
  'OPEN_ERROR_DIALOG' (state, message) {
    state.errorDialog = true
    state.errorMessage = message
  },
  'CLOSE_ERROR_DIALOG' (state) {
    state.errorDialog = false
    state.errorMessage = ''
  },
  'OPEN_SNACKBAR' (state, props) {
    state.snackbar = true
    state.snackbarMessage = props.message
    state.snackbarErrors = props.errors || []
    state.snackbarColor = props.color || 'red'
  },
  'CLOSE_SNACKBAR' (state) {
    state.snackbar = false
    state.snackbarMessage = ''
    state.snackbarErrors = []
    state.snackbarColor = 'red'
  }
}

const actions = {
  setLoadingStatus: ({commit}, status) => {
    commit('SET_LOADING_STATUS', status)
  },
  setLoadingMessage: ({commit}, message) => {
    commit('SET_LOADING_MESSAGE', message)
  },
  setProgressColor: ({commit}, color) => {
    commit('SET_PROGRESS_COLOR', color)
  },
  openErrorDialog: ({commit}, message) => {
    commit('OPEN_ERROR_DIALOG', message)
  },
  closeErrorDialog: ({commit}) => {
    commit('CLOSE_ERROR_DIALOG')
  },
  openSnackbar: ({commit}, props) => {
    commit('OPEN_SNACKBAR', props)
  },
  closeSnackbar: ({commit}) => {
    commit('CLOSE_SNACKBAR')
  }
}

const getters = {
  loading (state) {
    return state.loading
  },
  message (state) {
    return state.message
  },
  color (state) {
    return state.color
  },
  errorDialog (state) {
    return state.errorDialog
  },
  errorMessage (state) {
    return state.errorMessage
  },
  snackbar  (state) {
    return state.snackbar
  },
  snackbarMessage (state) {
    return state.snackbarMessage
  },
  snackbarErrors (state) {
    return state.snackbarErrors
  },
  snackbarColor (state) {
    return state.snackbarColor
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}