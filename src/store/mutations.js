export default {
  getTokName(state, payload) {
    if(payload !== undefined) {
      state.token = payload.token
      sessionStorage.setItem('token', state.token)
      state.uName = payload.uName
      sessionStorage.setItem('uName', payload.uName)
      return
    }
    state.uName = sessionStorage.getItem('uName');
  },
  getPath(state, payload) {
    state.activePath = payload
    sessionStorage.setItem('activePath', payload)
  }
}