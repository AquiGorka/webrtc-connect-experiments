# WebRTC Connnect

This is a WIP. Let's see if I can get this to work.

## The problem

WebRTC clients need a way to find each other to establish a connection between them. Usually a `signaling server` is used to connect clients. This `signaling servers` use `websockets` and some of the implementarions expect the clients to connect to them throughout the whole `p2p` session. Say goodbye to `client` to `client` serverless.

Without going into the details of running and maintaining such `signaling servers` it does not semm plaussible for this technology to scale up without incurring in servers costs. These costs can be efficiently optimized but it feels unnecesary to go into such work to set up a `p2p` app.


## The solution

As shown [here](https://github.com/feross/simple-peer#usage) to connect two or more peers it is only needed to exchange `signal` data between them. This can be achieved with any type of third way of communicating such data: snail mail, email, websocket server, synched api calls, sms and whatnot. We could even communicate the data using voice. Wait a minute. Wasn't there a time when computers used to send and receive data using telephone calls?

What if we could find a way to send the data from each client to the other using this technique? It has been done [before](https://github.com/martme/webaudio-modem).


## The steps

Let's connect `A` to `B`. There are two ways to do so:

### The `id` way

1. `A` sets itself up to start accepting WebRTC connections. With the `signal` data in place we append it to a URL and then shorten it.
2. `B` opens up the shoretened URL, parses the `signal` data, sets up its own WebRTC instance and then appends it to a shortened URL.
3. `A` inputs the unique part of the shortened URL (let's refer to it as `id`), appends it to the rest of the shortened URL and requests the data.
4. `A` and `B` are connected.

### The audio/modem way

1. `A` sets itself up to start accepting WebRTC connections. With the `signal` data in place we append it to a URL and then shorten it. And starts listening for incoming audio messages.
2. `B` opens up the shoretened URL, parses the `signal` data, sets up its own WebRTC instance and then appends it to a shortened URL.
3. `B` starts sending the `signal` data in an audio loop, until it receives a connection from `A`.
4. `A` and `B` are connected.


## Reference

- https://www.html5rocks.com/en/tutorials/webrtc/infrastructure/
- https://easyrtc.com/
- https://github.com/martme/webaudio-modem


In order to connect two or more clients using WebRTC a signaling server is needed. Even then, one peer has to use the `id` of another one to connect. This demo showcases how to use a simple login mechanism in two or more clients to connect to each other.

## Steps

For this hypothetical example let's assume there are two clients: `A` and `B`.

1. `A` logs in using any authenticity provider. In the background, once the login is succesful `A` connects to the signaling server (which might include a `jwt` or any other check to validate the login) and is given an individual id namespaced [login_user_id]`-client-1`.
1.1 There is a check to see if a main broadcasting peer exists [login_user_id-broadcaster], if it exsists then `A` tries to connect to it. If it does not exist the `A` will act as such.
2. `B` repeats step 1.
3. Any other client repeats step 1.

In the end we will have `N` number of clients all connected to the [login_user_ud-broadcaster]. This client is in charge of receiving messages and _broadcasting_ them to all the connected peers. If at any given moment the peer acting as the broadcaster disconnects then its place should be taken on by another client.

## Practical Result

1. `A` logs in.
2. `B` logs in.
3. `A` and `B` are now connected. No need to exchange `ids` to find each other.
