import {
  SET_SCAN_RANGE,
  SET_MACHINES_DATA,
 } from '../types/action-types';

export const setMachinesData = (data) => ({
  type: SET_MACHINES_DATA,
  payload: data,
});

export const setScanRange = (range) => ({
  type: SET_SCAN_RANGE,
  payload: range,
});
