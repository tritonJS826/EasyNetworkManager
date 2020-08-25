import machineStatus from '../constants/machineStatus';
import { pingMachines } from '../nodeScripts/ping';

export const machineCanonization = (machines, tableName) => machines.map((machine, i) => ({
  id: `${tableName}${i}`,
  ip: machine.ip,
  hostname: machine?.hostname,
  mac: machine?.mac,
  description: machine?.description ?? '',
  login: machine?.login ?? '',
  password: machine?.password ?? '',
  port: machine?.port ?? '',
  status: machine?.status ?? machineStatus.unknown,
  customCommands: machine?.commands ?? [
    {
      id: '0',
      name: 'example',
      command: 'ls',
    },
  ],
}));

export const setMachineStatus = (machine, status) => {
  const newMachine = { ...machine };
  newMachine.status = status;
  return newMachine;
};

export const machineMergeByIp = (machinesFromTable, machinesFromScaner) => {
  const machinesMap = new Map();

  machinesFromTable.forEach((machine) => {
    const newMachine = setMachineStatus(machine, machineStatus.unknown); // black
    machinesMap.set(newMachine.ip, newMachine);
  });

  machinesFromScaner.forEach((machine) => {
    const newMachine = setMachineStatus(machine, machineStatus.newOnline); // blue
    if (!machinesMap.has(machine.ip)) machinesMap.set(newMachine.ip, newMachine);
  });

  const canonicMachines = [...machinesMap].map((el) => el[1]);

  return canonicMachines;
};

export const checkMachinesStatus = async (machines) => {
  const promises = machines.map(async (machine) => {
    const oldStatus = machine?.status;

    if (oldStatus !== machineStatus.newOnline) {
      const isAlive = await pingMachines([machine.ip]);
      const newStatus = isAlive[0] ? machineStatus.oldOnline : machineStatus.offline;

      return newStatus;
    }

    return machineStatus.newOnline;
  });
  const statuses = await Promise.all(promises);

  return statuses;
};
