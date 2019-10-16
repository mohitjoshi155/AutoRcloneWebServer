const { spawn } = require('child_process');
// const ls = spawn('ls', ['-lh', '/usr']);

// ls.stdout.on( 'data', data => {
//     console.log( `stdout: ${data}` );
// } );

// ls.stderr.on( 'data', data => {
//     console.log( `stderr: ${data}` );
// } );

// ls.on( 'close', code => {
//     console.log( `child process exited with code ${code}` );
// } );

module.exports = (io) => {
  io.on("connection", socket => {
    console.log("connected", socket.id);
    socket.on("message", data => {
      if (data == "ls") {
        const ls = spawn('ls', ['-lh', '/usr']);
        ls.stdout.on("data", data => {
          socket.send(`${data}`);
        });
        ls.stderr.on("data", data => {
          socket.send(`${data}`);
        });
        ls.on("close", code => {
          socket.send(`child process exited with code ${code}`);
        })
      }
    })

  });

  io.on("disconnect", () => { });
}