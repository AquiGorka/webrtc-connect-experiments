# WebRTC Connnect

This is a WIP. Let's see if I can get this to work.

## The problem

WebRTC clients need a way to find each other to establish a connection between them. Usually a `signaling server` is used to connect clients. This `signaling servers` use `websockets` and some of the implementarions expect the clients to connect to them throughout the whole `p2p` session. Say goodbye to `client` to `client` serverless.

Without going into the details of running and maintaining such `signaling servers` it does not seem plausible for this technology to scale up without incurring in servers costs. These costs can be efficiently optimized but it feels unnecesary to go into such work to set up a `p2p` app.


## The solution

As shown [here](https://github.com/feross/simple-peer#usage) to connect two or more peers it is only needed to exchange `signal` data between them. This can be achieved with any type of third way of communicating such data: snail mail, email, websocket server, synched api calls, sms and whatnot. We could even communicate the data using voice. Wait a minute. Wasn't there a time when computers used to send and receive data using telephone calls?

What if we could find a way to send the data from each client to the other using this technique? It has been done [before](https://github.com/martme/webaudio-modem).


## The steps

Let's connect `A` to `B`. There are two ways to do so:

### The _id_ way

1. `A` sets itself up to start accepting WebRTC connections. With the `signal` data in place we append it to a URL and then shorten it.
2. `B` opens up the shoretened URL, parses the `signal` data, sets up its own WebRTC instance and then appends it to a shortened URL.
3. `A` inputs the unique part of the shortened URL (let's refer to it as `id`), appends it to the rest of the shortened URL and requests the data.
4. `A` and `B` are connected.

### The audio/modem way

1. `A` sets itself up to start accepting WebRTC connections. With the `signal` data in place we append it to a URL and then shorten it. `A` starts listening for incoming audio messages.
2. `B` opens up the shoretened URL, parses the `signal` data, sets up its own WebRTC instance and then appends it to a shortened URL.
3. `B` starts sending the `signal` data in an audio loop, until it receives a connection from `A`.
4. `A` and `B` are connected.

## Dev

```sh
# don't forget to source your .env file
# source .env
npm start
```

And then open up a browser to http://localhost:9966

## Build

```sh
# don't forget to source your .env file
# source .env
npm run build
```

There will be a newly created `dist` folder.


## Notes

Using URL shorteners helps deliver the data payload. The required services are much cheapier and can scale up more efficiently than their `signaling` counterparts. Some other way of _minifying_ the payload could provide an even better way to scale up. One thing at a time.

To use this get a Google Api Key from [here](https://console.developers.google.com/apis/credentials). Set an environment variable (GOOGLE_APIKEY) with it to make this repo work.

## Reference

- https://www.html5rocks.com/en/tutorials/webrtc/infrastructure/
- https://github.com/feross/simple-peer
- https://easyrtc.com/
- https://github.com/martme/webaudio-modem

