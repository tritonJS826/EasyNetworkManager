import { pushStory } from '../redux/actions/creators/terminal';
const Client = require('ssh2').Client;

const sshExecuteCommand = (command = 'uptime',address ='172.21.96.50', port = 22, username = 'admin', password = '7393075Sfx') =>  {
  return async (dispatch) => {
    let conn = new Client();
    dispatch(pushStory('Connecting...'));
    conn.on('ready', function() {
    dispatch(pushStory('Client :: ready'));
    conn.exec(command, function(err, stream) {
      if (err) {
        dispatch(pushStory(err));
        throw err;
      };
      stream.on('close', function(code, signal) {
        dispatch(pushStory(`Stream :: close :: code: ${code}, signal: ${signal} \n`));
        conn.end();
      }).on('data', function(data) {
        dispatch(pushStory(`STDOUT: ${data}`));
      }).stderr.on('data', function(data) {
        dispatch(pushStory(`STDERR: ${data}`));
      });
    });
  }).connect({
    host: address,
    port: port,
    username: username,
    password: password
  });
 }
};

export default sshExecuteCommand;
