const net = require('net');
module.exports= async  (email) {
    const domain = email.split('@')[1];

    // Connect to the SMTP server
    const socket = net.createConnection(25, domain);

    // Wait for the socket to connect
    await new Promise(resolve => socket.on('connect', resolve));

    // Send the VRFY command
    socket.write(`VRFY ${email}\r\n`);

    // Wait for the server's response
    const data = await new Promise(resolve => socket.on('data', resolve));

    // Close the connection
    socket.end();

    // Check the server's response
    if (data.toString().startsWith('250')) {
        return true; // Email address exists
    } else {
        return false; // Email address does not exist or could not be verified
    }
}
