const sortByAccess = (machines) => {
  const newMachines = [...machines].sort((a, b) => (a.login > b.login ? 1 : -1));
  return newMachines;
};

const sortByIp = (machines) => {
  const newMachines = [...machines].sort((a, b) => (a.ip > b.ip ? 1 : -1));
  return newMachines;
};

const sortByHostName = (machines) => {
  const newMachines = [...machines].sort((a, b) => (a.hostname < b.hostname ? 1 : -1));
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
  if (sortBy?.includes('Reverse')) return sortByReverse(machines);
  return machines;
};

export default sortMachines;
