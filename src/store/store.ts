import Vue from 'vue';
import Vuex from 'vuex';

import { AggregatorService } from '../shared/services/agregator.service';
import { SET_PROCESS, SET_SERVER, SET_SPEC, SET_HAS_BEEN_INIT } from '../shared/constants/pm2.constant';

Vue.use(Vuex);

const MAX_ITEMS = 150;

export default new Vuex.Store({
  state: {
    process: {},
    server: [],
    spec: {},
    hasBeenInit: false
  },
  mutations: {
    [SET_PROCESS](state, process) {
      state.process = {
        ...state.process, [process.unique_id] : {
          uniqueId: process.unique_id,
          cpu: process.cpu,
          name: process.name,
          memory: process.memory,
          status: process.status,
          versioning: process.versioning,
          watching: process.watching,
          uptime: process.pm_uptime,
        }
      }
    },
    [SET_SERVER](state: {server: any[]}, server) {
      const date = (new Date()).getTime();
      if (state.server.length > MAX_ITEMS) {
        state.server = [
          ...state.server.filter((_: any, index: number) => index > MAX_ITEMS/2),
          {
            updatedAt: date,
            freeMemory: server.free_mem,
            totalMemory: server.total_mem,
            cpu: server.cpu,
            type: server.type,
            pm2version: server.pm2_version,
            averageLoad: server.loadavg
          }
        ];
      }
      state.server = [
        ...state.server, {
        updatedAt: date,
        freeMemory: server.free_mem,
        totalMemory: server.total_mem,
        cpu: server.cpu,
        type: server.type,
        pm2version: server.pm2_version,
        averageLoad: server.loadavg
        }
      ];
    },
    [SET_SPEC](state: any, server: any) {
      state.spec = {
        ...state.spec,
        cpu: server.cpu,
        type: server.type,
        totalMemory: server.total_mem,
        pm2version: server.pm2_version
      };
    },
    [SET_HAS_BEEN_INIT](state: any, hasBeenInit: boolean) {
      state.hasBeenInit = hasBeenInit;
    }
  },
  getters: {
    spec: state => state.spec,
    hasBeenInit: state => state.hasBeenInit,
    memoryUsageByProcess: state => AggregatorService.getProcessInformation(Object.keys(state.process), 'memory', state.process),
    memoryAndCpu: state => AggregatorService.getProcessAndCpuInformation(Object.keys(state.process), state.process),
    memoryUsage: state => AggregatorService.getServeUsedMemory(state.server),
    averageLoad: state => AggregatorService.getAverageLoadByELapsedTime(state.server),
  },
});
