import axios from 'axios'
import router from "../router/index";

const state = {
  requester: {
    email: null,
    id: null
  },
  file: null,
  fields: [],
  errors: [],
  formStep: 1,
  fieldUpdate: {
    id: null,
    field: null,
    value: null
  }
}

const mutations = {
  'SET_REQUESTER' (state, requester) {
    state.requester = requester
  },
  'SET_FILE' (state, file) {
    state.file = file
  },
  'SET_FIELDS' (state, fields) {
    state.fields = fields
  },
  'SET_ERRORS' (state, errors) {
    state.errors.push(errors)
  },
  'REMOVE_ERROR' (state, index) {
    state.errors.splice(index, 1)
  },
  'SET_FORM_STEP' (state, step) {
    state.formStep = step
  },
  'UPDATE_FIELD' (state, values) {
    state.fieldUpdate = values
  }
}

const actions = {
  setRequester: ({commit, dispatch}, email) => {
    dispatch('setLoadingStatus', true)
    dispatch('setLoadingMessage', 'Please wait...')
    axios.post(`order/check/${email}`)
      .then(response => {
        commit('SET_REQUESTER', {email: email, id: response.data.exists.id})
        dispatch('setLoadingStatus', false)
        router.push('/order')
      })
      .catch(error => {
        dispatch('setLoadingStatus', false)
        dispatch('openSnackbar', {message: error.response.data.message})
      })
  },
  setFile: ({commit}, file) => {
    commit('SET_FILE', file)
  },
  uploadFile: ({commit, dispatch}) => {
    dispatch('setLoadingStatus', true)
    dispatch('setLoadingMessage', 'We are processing your order, please wait...')
    let formData = new FormData();
    formData.append('order', state.file);
    formData.append('email', state.requester.email)
    axios.post('order/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    ).then(response => {
      commit('SET_FIELDS', response.data.fields)
      response.data.errors.map(item => {
        commit('SET_ERRORS', getKeyByValue(item, null))
      })
      dispatch('setFormStep', 2)
      dispatch('setLoadingStatus', false)
    })
    .catch(error => {
      dispatch('setLoadingStatus', false)
      dispatch('openSnackbar', {message: error.response.data.message, errors: error.response.data.errors})
    })
  },
  setFormStep: ({commit}, step) => {
    commit('SET_FORM_STEP', step)
  },
  removeError: ({commit}, index) => {
    commit('REMOVE_ERROR', index)
  },
  updateOrderItem: ({commit, dispatch}, props) => {
    if (props.id === null || props.field === null || props.value === null) {
      return
    }

    commit('UPDATE_FIELD', {id: props.id, field: props.field, value: props.value})
    let formData = new FormData();
    formData.append('id', state.fieldUpdate.id);
    formData.append('field', state.fieldUpdate.field)
    formData.append('value', state.fieldUpdate.value)

    axios.post('order/update/item', formData)
      .then(response => {
        let id = state.errors.map((e) => { return e.id }).indexOf(state.fieldUpdate.id)
        let field = state.errors.map((e) => { return e.field }).indexOf(state.fieldUpdate.field)
        if (id != -1 && field != -1 && response.data === 1) {
          dispatch('removeError', id)
        }
      })
      .catch(error => {
        dispatch('openSnackbar', {message: error.response.data.message, errors: error.response.data.errors})
      })
  }
}

const getters = {
  requester (state) {
    return state.requester
  },
  fileUpload (state) {
    return state.file
  },
  fields (state) {
    return state.fields
  },
  errors (state) {
    return state.errors
  },
  formStep (state) {
    return state.formStep
  }
}

const getKeyByValue = (object, value) => {
  return {
    field: Object.keys(object).find(key => object[key] === value),
    id: object.id
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}