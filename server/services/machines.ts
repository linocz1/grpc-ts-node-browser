import { Machine, GPS } from '../proto/machines_pb'
import { getRandomInt } from '../helpers/random'

const activeDestinations: Record<number, GPS> = {}
const fuelPerMove = 0.15


const defineRandomDestination = (machine: Machine) => {
  const randomLocation = new GPS()
  randomLocation.setLat(getRandomInt(0, 90))
  randomLocation.setLon(getRandomInt(0, 90))
  activeDestinations[machine.getId()] = randomLocation
}

export const moveMachine = (machine: Machine) => {
  if (!activeDestinations[machine.getId()]) {
    defineRandomDestination(machine)
  }

  const { lat = 0, lon = 0 } = machine.getLocation()?.toObject() || {}
  const destination = activeDestinations[machine.getId()]

  const newLocation = new GPS()

  // Choose which dimension to move in: if latitudes are not equal, choose latitude; else, choose longitude
  if (destination.getLat() != lat) {
    newLocation.setLat(lat + (destination.getLat() < lat ? -1 : 1));
    newLocation.setLon(lon); // Keep longitude the same
  } else if (destination.getLon() != lon) {
    newLocation.setLon(lon + (destination.getLon() < lon ? -1 : 1));
    newLocation.setLat(lat); // Keep latitude the same
  } else {
    // If machine already at the destination, define a new one
    defineRandomDestination(machine)
    return; // End function here as we don't need to move the machine
  }

  newLocation.setAlt(0)

  machine.setLocation(newLocation)
  machine.setFuelLevel(machine.getFuelLevel() - fuelPerMove)

  if (machine.getFuelLevel() <= 0) {
    machine.setFuelLevel(0)
    machine.setIsPaused(true)
  }
}
