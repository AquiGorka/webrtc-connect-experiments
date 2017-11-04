// A (initiator)
import Peer from 'simple-peer'
import GoogleURL from 'google-url'
import 'setimmediate'

const googleUrl = new GoogleURL({ key: process.env.GOOGLE_APIKEY })
const p = new Peer({ initiator:true , trickle: false })

p.on('signal', data => {
  googleUrl.shorten(`${location.href}?d=${btoa(JSON.stringify(data))}#B`, (err, shortUrl)=> {
    console.log(shortUrl)
    document.querySelector('#a__signal').innerHTML = shortUrl
  });
})
p.on('connect', () => {
  console.log('A is connected to B')
})
p.on('data', data => {
  console.log('Received data: ' + data)
})

document.querySelector('#a').style.display = 'block'
document.querySelector('#a__button').addEventListener('click', () => {
  const id = document.querySelector('#a__id').value
  googleUrl.expand(`https://goo.gl/${id}`, (err, longUrl) => {
    console.log(longUrl)
    const data = JSON.parse(atob(longUrl.split('?d=')[1]))
    p.signal(data)
  })
})
window.p = p
