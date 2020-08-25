import {
  SET_IP_TABLES,
  SET_CURRENT_IP_TABLE,
  SET_CURRENT_MACHINES,
  DEL_MACHINE,
  RESET_TABLES,
  RESET_MACHIE_STATUS_BY_ID,
} from '../types/action-types';

export const resetMachineStatusById = (id, newStatus) => ({
  type: RESET_MACHIE_STATUS_BY_ID,
  payload: { id, newStatus },
});

export const resetTables = () => ({
  type: RESET_TABLES,
});

export const delMachine = (id) => ({
  type: DEL_MACHINE,
  payload: id,
});

export const setCurrentMachines = (machines) => ({
  type: SET_CURRENT_MACHINES,
  payload: machines,
});

export const setIpTables = (tables) => ({
  type: SET_IP_TABLES,
  payload: tables,
});

export const setCurrentIpTable = (table) => ({
  type: SET_CURRENT_IP_TABLE,
  payload: table,
});
