const users = []
const net = require('net');
const fs = require('fs');

const port = 3333;

let writeStream = fs.createWriteStream('./server.log', { flags: 'a' } );
process.stdin.setEncoding('utf8');

process.stdin.on('data', (data) => {  
 } )

const server = net.createServer((client) => { 
 users.push(client); // Add the new client to the list

    let user = undefined;
    
    client.write('Choose a username: ');
    client.on( 'data', (data) => { 
        if (user  === undefined) {
            user = data.toString().trim();
            welcome = `Welcome ${user} to the server! \n`;
            console.log(welcome);
            client.write(welcome)
            writeStream.write(welcome);
        } else {  
            const message = `${user}: ${data.toString()}`;
            console.log(message);
            writeStream.write(message + '\n');
          
            // Broadcast the message to all other clients
            users.forEach((current) => {
                if (current !== client) {
                    current.write(message);
                }
            });
        }
    });

    const handleDisconnect = (reason) => {
        if (users.includes(client)) {
            users.splice(users.indexOf(client), 1); // Remove the client from the list
            const disconnectMessage = `${user || 'A user'} has disconnected${reason ? `: ${reason}` : '.'}`;
            console.log(disconnectMessage);
            writeStream.write(disconnectMessage + '\n');
            users.forEach((current) => {
                if (current !== client) {
                    current.write(disconnectMessage + '\n');
                }
            });
        }
    };

    client.on('end', () => {
        handleDisconnect(); // Handle normal disconnection
    });

    client.on('error', (err) => {
        handleDisconnect(); // Handle disconnection due to an error
    });

}).listen(port, () => {
    console.log(`Hello from harbor ${port}`)
});

