import { GPS, Machine } from './proto/machines_pb'

export function machineMockToClass({ id, location, fuelLevel, isPaused }: Machine.AsObject) {
  let gps: GPS | undefined
  if (location) {
    gps = new GPS()
    gps.setLat(location.lat)
    gps.setLon(location.lon)
    gps.setAlt(location.alt)
  }

  const machine = new Machine()
  machine.setId(id)
  machine.setLocation(gps)
  machine.setFuelLevel(fuelLevel)
  machine.setIsPaused(isPaused)

  return machine
}

const machineMocks: Machine.AsObject[] = [
  { id: 1, location: { lat: 40, lon: 50, alt: 0 }, fuelLevel: 100, isPaused: false },
  { id: 2, location: { lat: 30, lon: 30, alt: 0 }, fuelLevel: 80, isPaused: true },
  { id: 3, location: { lat: 60, lon: 80, alt: 0 }, fuelLevel: 50, isPaused: false },
]

export const machines = machineMocks.map(machineMockToClass)
