const fs = require('fs');
const net = require('net');

port = 3333

const client = net.createConnection({ port: port }, () => {
    console.log('Connection Succesful!');
});

client.setEncoding('utf8');

client.on('data', data => {
    console.log(data)
});

client.on('end', () => {
 console.log('Disconnected from server');
 client.end(); 
});

writeStream = fs.createWriteStream('./client.log' );
process.stdin.setEncoding('utf8');

process.stdin.on('data', (data) => {  

    // Exit
     if (data.toLowerCase().trim() === 'exit') {
          console.log('Disconnected from server');
          writeStream.close();
          process.exit();
     } else {
         // Write to file
         writeStream.write(data);
         client.write(data);
     }
 
 
 } )