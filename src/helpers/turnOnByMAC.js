const wol = require('wakeonlan');

const turnOnByMAC = () => {
  wol('04:18:D6:A0:47:27').then(() => {
    alert('package sent');
  });
};

export default turnOnByMAC;
