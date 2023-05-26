proto-gen:
	(cd server && yarn proto-gen) && (cd client; yarn proto-gen)

server:
	(cd server && yarn dev)

client:
	(cd client && yarn dev)

.PHONY: proto-gen server client
