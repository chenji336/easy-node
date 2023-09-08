process.on('message', m => {
  console.log('child get msg:', m)
})

process.send({foo: 'bar'})