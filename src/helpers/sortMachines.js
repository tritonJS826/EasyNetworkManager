const sortByAccess = (machines) => {
  const newMachines = [...machines].sort((a, b) => (a.login > b.login ? 1 : -1));
  return newMachines;
};

const sortByIp = (machines) => {
  const newMachines = [...machines].sort((a, b) => {
    const num1 = Number(a.ip.split('.').map((num) => (`000${num}`).slice(-3)).join(''));
    const num2 = Number(b.ip.split('.').map((num) => (`000${num}`).slice(-3)).join(''));
    return num1 - num2;
  });

  return newMachines;
};

const sortByHostName = (machines) => {
  const newMachines = [...machines].sort((a, b) => ((a?.hostname ?? '') < (b?.hostname ?? '') ? 1 : -1));
  return newMachines;
};

const sortByStatus = (machines) => {
  const newMachines = [...machines].sort((a, b) => (a.status > b.status ? 1 : -1));
  return newMachines;
};

const sortByReverse = (machines) => {
  const newMachines = [...machines];
  return newMachines.reverse();
};

const sortMachines = (machines, sortBy) => {
  if (sortBy === 'access') return sortByAccess(machines);
  if (sortBy === 'ip') return sortByIp(machines);
  if (sortBy === 'hostName') return sortByHostName(machines);
  if (sortBy === 'status') return sortByStatus(machines);
  if (sortBy === 'reverse') return sortByReverse(machines);
  return machines;
};

export default sortMachines;
