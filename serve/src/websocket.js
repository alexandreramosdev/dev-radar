import socketio from 'socket.io'

import parseStringAsArray from './utils/parseStringAsArray'
import getDistanceFromLatLonInKm from './utils/calculateDistance'

let io
const connections = []

function setupWebsocket(server) {
  io = socketio(server)

  io.on('connection', socket => {
    const id = socket.id
    const { latitude, longitude, techs } = socket.handshake.query

    connections.push({
      id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude),
        techs: parseStringAsArray(techs)
      }
    })
    console.log(connections)
  })
}

function findConnections(coordinates, techs) {
  console.log(techs)
  return connections.filter(connection => {
    return getDistanceFromLatLonInKm(coordinates, connection.coordinates) < 10
    // && connection.techs.some(item => techs.includes(item)) 
    // FIXME
  })
}

function sendMessage(to, message, data) {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data)
  })
}

export {
  setupWebsocket,
  findConnections,
  sendMessage
}

