import {
  SET_IP_TABLES,
  SET_CURRENT_IP_TABLE,
  SET_CURRENT_MACHINES,
  DEL_MACHINE,
  RESET_TABLES,
  RESET_MACHIE_STATUS_BY_ID,
} from '../actions/types/action-types';

const initialIpTables = {
  tables: [],
  currentTable: {
    id: '',
    name: '',
    description: 'select the table you want',
    ipRange: '',
    machines: [],
  },
};

const ipTablesReducer = (state = initialIpTables, { type, payload }) => {
  switch (type) {
    case RESET_MACHIE_STATUS_BY_ID:
      return {
        ...state,
        currentTable: {
          ...state.currentTable,
          machines: state.currentTable.machines.map((el) => {
            if (payload.id === el.id) {
              const newEl = el;
              newEl.status = payload.newStatus;
              return newEl;
            }
            return el;
          }),
        },
      };
    case DEL_MACHINE:
      return {
        ...state,
        currentTable: {
          ...state.currentTable,
          machines: state.currentTable.machines.filter(({ id }) => id !== payload),
        },
      };
    case SET_CURRENT_MACHINES:
      return {
        ...state,
        currentTable: {
          ...state.currentTable,
          machines: payload,
        },
      };
    case SET_IP_TABLES:
      return {
        ...state,
        tables: payload,
      };
    case SET_CURRENT_IP_TABLE:
      return {
        ...state,
        currentTable: payload,
      };
    case RESET_TABLES:
      return initialIpTables;
    default:
      return state;
  }
};

export default ipTablesReducer;
