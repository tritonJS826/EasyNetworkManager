import { pushStory } from '../redux/actions/creators/terminal';

const { Client } = require('ssh2');

const sshExecuteCommand = (
  command = 'uptime',
  address = '172.21.96.50',
  port = 22,
  username = 'admin',
  password = '7393075Sfx',
) => async (dispatch) => {
  const conn = new Client();
  dispatch(pushStory('Connecting...'));
  conn
    .on('ready', () => {
      dispatch(pushStory('Client :: ready'));
      conn.exec(command, (err, stream) => {
        if (err) {
          dispatch(pushStory(err));
          throw err;
        }
        stream
          .on('close', (code, signal) => {
            dispatch(pushStory(`Stream :: close :: code: ${code}, signal: ${signal} \n`));
            conn.end();
          })
          .on('data', (data) => {
            dispatch(pushStory(`STDOUT: ${data}`));
          })
          .stderr.on('data', (data) => {
            dispatch(pushStory(`STDERR: ${data}`));
          });
      });
    })
    .connect({
      host: address,
      port,
      username,
      password,
    });
};

export default sshExecuteCommand;
