const SINGLE_MACHINE_BTNS = [
  {
    type: 'PING',
    name: 'ping',
    action: () => {console.log('PING')}
  },
  {
    type: 'EXTERNAL_STATISTIC',
    name: 'Внешняя информация',
    action: () => {console.log('EXTERNAL_STATISTIC')}
  },
  {
    type: 'SSH_CONNECT',
    name: 'Подключение SSH',
    action: () => {console.log('SSH_CONNECT')}
  },
  {
    type: 'INTERNAL_STATISTIC',
    name: 'Внутренняя информация',
    action: () => {console.log('INTERNAL_STATISTIC')}
  },
];

export default SINGLE_MACHINE_BTNS;
