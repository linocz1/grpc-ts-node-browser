import {
  ServerUnaryCall,
  sendUnaryData,
  ServiceError,
  ServerWritableStream,
} from 'grpc'

import { moveMachine } from '../services/machines'
import { IMachineMapServer } from '../proto/machines_grpc_pb'
import { GPS, Machine, MachineStreamRequest } from '../proto/machines_pb'
import { machines } from '../db'

let machineMoveInterval: NodeJS.Timeout

export class MachineMapServer implements IMachineMapServer {
  setMachineLoc(call: ServerUnaryCall<Machine>, callback: sendUnaryData<GPS>) {
    const machineId = call.request.getId()
    const machine = machines.find(m => m.getId() === machineId)

    if (!machine) {
      const error: ServiceError = {
        name: 'Machine Missing',
        message: `Machine with ID ${machineId} does not exist.`,
      }
      callback(error, null)
      return
    }

    machine.setLocation(call.request.getLocation())

    callback(null, machine.getLocation()!)
  }

  getMachineLoc(call: ServerUnaryCall<Machine>, callback: sendUnaryData<GPS>) {
    const machineId = call.request.getId()
    const machine = machines.find(m => m.getId() === machineId)

    if (!machine) {
      const error: ServiceError = {
        name: 'Machine Missing',
        message: `Machine with ID ${machineId} does not exist.`,
      }
      callback(error, null)
      return
    }

    console.log(`getMachine: returning machine (id: ${machine.getId()}).`)
    callback(null, machine.getLocation()!)
  }

  pause(call: ServerUnaryCall<Machine>, callback: sendUnaryData<Machine>) {
    const machineId = call.request.getId()
    const machine = machines.find(m => m.getId() === machineId)

    if (!machine) {
      const error: ServiceError = {
        name: 'Machine Missing',
        message: `Machine with ID ${machineId} does not exist.`,
      }
      callback(error, null)
      return
    }

    machine.setIsPaused(true)

    callback(null, machine)
  }

  unPause(call: ServerUnaryCall<Machine>, callback: sendUnaryData<Machine>) {
    const machineId = call.request.getId()
    const machine = machines.find(m => m.getId() === machineId)

    if (!machine) {
      const error: ServiceError = {
        name: 'Machine Missing',
        message: `Machine with ID ${machineId} does not exist.`,
      }
      callback(error, null)
      return
    }

    machine.setIsPaused(false)

    callback(null, machine)
  }

  refuel(call: ServerUnaryCall<Machine>, callback: sendUnaryData<Machine>) {
    const machineId = call.request.getId()
    const machine = machines.find(m => m.getId() === machineId)

    if (!machine) {
      const error: ServiceError = {
        name: 'Machine Missing',
        message: `Machine with ID ${machineId} does not exist.`,
      }
      callback(error, null)
      return
    }

    machine.setFuelLevel(100)

    callback(null, machine)
  }

  machineStream(call: ServerWritableStream<MachineStreamRequest>) {
    if (machineMoveInterval) clearInterval(machineMoveInterval)
    const run = () => {
      for (const machine of machines) {
        if (!machine.getIsPaused()) moveMachine(machine)
        call.write(machine)
      }
    }
    machineMoveInterval = setInterval(run, 500)
  }
}
