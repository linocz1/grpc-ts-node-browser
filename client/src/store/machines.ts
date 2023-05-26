import { defineStore } from 'pinia'
import { Machine, MachineStreamRequest } from '../../proto/machines'
import { client } from '../services/grpc'

export const useMachinesStore = defineStore('machines', {
  state: () => ({
    machines: [] as Machine[],
    isLoading: false,
  }),
  actions: {
    readMachinesStream() {
      const req = MachineStreamRequest.create()
      const call = client.machineStream(req)

      call.responses.onMessage(machine => {
        console.log('machine', machine)
        const index = this.machines.findIndex(m => m.id === machine.id)
        if (index !== -1) {
          this.machines[index] = machine
        } else {
          this.machines.push(machine)
        }
      })
    },
    pause(machine: Machine) {
      client.pause(machine)
    },
    unPause(machine: Machine) {
      client.unPause(machine)
    },
    togglePause(machine: Machine) {
      if (machine.isPaused) {
        this.unPause(machine)
      } else {
        this.pause(machine)
      }
    },
    refuel(machine: Machine) {
      client.refuel(machine)
    },
  },
})