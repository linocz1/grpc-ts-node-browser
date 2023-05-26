# Instructions

### Server setup:

```
cd server
yarn
```

Initialize and start Envoy proxy (needed for gRPC so that it works in the browser)

```
docker-compose up
```

Start the backend:

```
yarn dev
```

### Client setup and start:

```
cd client
yarn
yarn dev
```

### Build proto files:

```
make proto-gen
```
