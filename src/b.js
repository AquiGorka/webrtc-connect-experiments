// B

import Peer from 'simple-peer'
import GoogleURL from 'google-url'
import 'setimmediate'
import config from '../config'

const p = new Peer({ trickle: false })
const data = JSON.parse(atob(location.search.split('?d=')[1]))
const googleUrl = new GoogleURL({ key: config.google.apiKey })

p.on('signal', data => {
  googleUrl.shorten(`//${location.host}/?d=${btoa(JSON.stringify(data))}`, (err, shortUrl) => {
    // remove the length of https://goo.gl/
    const id = shortUrl.substr(15)
    console.log(id)
    document.querySelector('#b__id').innerHTML = id
  })
})

p.on('connect', () => {
  console.log('B is connected to A')
})
p.on('data', data => {
  console.log('Received data: ' + data)
})

p.signal(data)

document.querySelector('#b').style.display = 'block'
window.p = p
