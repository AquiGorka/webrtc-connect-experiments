// A (initiator)
import Peer from 'simple-peer'
import GoogleURL from 'google-url'
import 'setimmediate'

const googleUrl = new GoogleURL({ key: process.env.GOOGLE_APIKEY })
const p = new Peer({ initiator:true , trickle: false })

p.on('signal', data => {
  googleUrl.shorten(`${location.origin}${location.pathname}?data=${btoa(JSON.stringify(data))}#B`, (err, shortUrl)=> {
    console.log(shortUrl)
    document.querySelector('#a__signal').innerHTML = shortUrl
  });
})
p.on('connect', () => {
  console.log('A is connected to B')
	console.log('You can send messages using p.send(\'Hello there, how are you?\')')
	alert('p2p working with zero servers. Check your browser console.')
})
p.on('data', data => {
  console.log('Received data: ' + data)
})

document.querySelector('#a').style.display = 'block'
document.querySelector('#a__button').addEventListener('click', () => {
  const id = document.querySelector('#a__id').value
  googleUrl.expand(`https://goo.gl/${id}`, (err, longUrl) => {
    console.log(longUrl)
    const data = JSON.parse(atob(longUrl.split('?data=')[1]))
    p.signal(data)
  })
})
window.p = p
