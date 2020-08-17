const SINGLE_MACHINE_BTNS = {
  QUICK_SCAN: {
    name: 'Быстрое сканирование',
    action: () => {console.log('QUICK_SCAN')}
  },
  DETAILED_SCAN: {
    name: 'Детальное сканирование',
    action: () => {console.log('DETAILED_SCAN')}
  },
  NMAP_QUERY: {
    name: 'nmap query',
    action: () => {console.log('NMAP_QUERY')}
  },
};

export default SINGLE_MACHINE_BTNS;
