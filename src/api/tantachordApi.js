import axios from 'axios'

const tantachordApi = axios.create({baseURL: 'http://localhost:8080'})
const addToken = (token) => (
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
)

// Auth
export const register = (input) => {
  return tantachordApi.post('/auth/register', input)
}
export const login = (input) => {
  return tantachordApi.post('/auth/login', input)
}
export const getMe = (token) => {
  return tantachordApi.get('/auth/getme', addToken(token))
}

// Create
export const createPlaylist = (input, inputChordlist,token) => {
  return tantachordApi.post('/playlist/', ({input, inputChordlist}), addToken(token))
}


// Edit
export const getPlaylistById = (id) => {
  return tantachordApi.get(`/playlist/${id}`)
}
export const getChordlistByPlaylistId = (id) => {
  return tantachordApi.get(`/chordlist/${id}`)
}

export const updatePlaylist = (id, input, token) => {
  return tantachordApi.put(`/playlist/${id}`, input, addToken(token))
}
export const updateChordlist = (id, input, token) => {
  return tantachordApi.put(`/chordlist/${id}`, input, addToken(token))
}

// Playlist
export const searchPlaylist = (input) => {
  return axios.create({baseURL: 'http://localhost:8080'}).post('/playlist/search', input)
}
export const deletePlaylist = (id) => {
  return tantachordApi.delete(`/playlist/${id}`)
}
