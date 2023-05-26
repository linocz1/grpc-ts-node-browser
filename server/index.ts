import { Server, ServerCredentials } from 'grpc'
import { MachineMapService } from './proto/machines_grpc_pb'
import { MachineMapServer } from './servers/MachineMapServer'

const server = new Server()
server.addService(MachineMapService, new MachineMapServer())

const port = 3020
const uri = `localhost:${port}`
console.log(`Listening on port ${port}`)
server.bind(uri, ServerCredentials.createInsecure())

server.start()
