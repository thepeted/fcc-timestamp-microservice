'use strict'
const http = require('http')
const index = require('fs').readFileSync('./public/index.html')

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'})
    res.end()
    return
  }

  if (req.method === 'GET') {
    if (req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(index)
      return
    }
    
    const result = { unix: null, natural: null } 
    let input = decodeURI(req.url).substr(1)
    
    // if string contains only digits then coerce and convert to millisecs
    !isNaN(input) && (input*= 1000);

    const date = new Date(input)
    if (date.toString() !== 'Invalid Date') {
      result.unix = date.getTime() / 1000
      result.natural = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    }

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify(result))
  }
  res.end()
})

const port = process.env.PORT || 3000;
console.log('server listening on port ' + port)
server.listen(port)