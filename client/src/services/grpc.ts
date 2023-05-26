import { MachineMapClient } from '../../proto/machines.client'
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport'

const transport = new GrpcWebFetchTransport({
  baseUrl: 'http://localhost:8080'
})

export const client = new MachineMapClient(transport)
