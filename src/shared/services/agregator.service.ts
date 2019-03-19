import { Process } from '../models/process.model';
import { Server } from '../models/server.model';
import { Gigabyte, Megabyte } from '../constants/pm2.constant';

const PROCESS_ENTITY_MAPPING: any = {
  memory: {
    name: 'memory',
    alias: 'M',
    value: (val: number) => val / Megabyte
  },
  cpu: {
    name: 'cpu',
    alias: 'C',
    value: (val: number) => val
  }
}

export class AggregatorService {
  /**
   * @description Get process information
   * @params {string[]} an array of id
   * @params {string} the property to get in the process object
   * @params {any} the process state
   */
  public static getProcessInformation(ids: string[], type: string, process: any) {
    if (!PROCESS_ENTITY_MAPPING[type]) {
      return [];
    }

    return ids.reduce((processAcc: any[], id: string) => {
      const processFromId: Process = process[id];

      if (!processFromId) {
        return processAcc;
      }

      return [...processAcc,
        {
          name: `${processFromId.name}_${processFromId.uniqueId}`,
          parent: PROCESS_ENTITY_MAPPING[type].alias,
          value:  PROCESS_ENTITY_MAPPING[type].value(processFromId[type]),
        },
      ]
    }, [
      {
        id: PROCESS_ENTITY_MAPPING[type].alias,
        name: PROCESS_ENTITY_MAPPING[type].name,
      },
    ])
  }

  /**
   * @description Get process and cpu information
   * @params {string[]} an array of id
   * @params {any} the process state
   */
  public static getProcessAndCpuInformation(ids: string[], process: any) {
    const { memory, cpu } = ids.reduce((processAcc: any, id: string) => {
      const processFromId: Process = process[id];

      if (!processFromId) {
        return processAcc;
      }

      return {...processAcc,
        memory: [...processAcc.memory, processFromId.memory / Megabyte ],
        cpu: [...processAcc.cpu, processFromId.cpu]
      }
    }, {
      memory: [],
      cpu: [],
    });

    return [
      {
        data: memory,
        name:'memory'
      }, {
        data: cpu,
        yAxis: 1,
        name: 'cpu'
      }
    ]
  }

  /**
   * @description Get the memory used on the server
   * @params {Server[]} The server state
   */
  public static getServeUsedMemory(server: Server[]) {
    return server.reduce((serverAcc: any, server: Server) => {
      return [...serverAcc,
        [
          server.updatedAt,
          (server.totalMemory / Gigabyte - server.freeMemory / Gigabyte)
        ]
      ]
    }, []);
  }

  /**
   * @description Get average load on the server
   * @params {Server[]} The server state
   */
  public static getAverageLoadByELapsedTime(server: Server[]) {
    const { oneMinuteAgo, fiveMinutesAgo, fifteenMinutesAgo } = server.reduce((serverAcc: any, server: Server) => {
      const [
        oneMinuteAgo,
        fiveMinutesAgo,
        fifteenMinutesAgo
      ] = server.averageLoad;
      const { updatedAt } = server;
      return {...serverAcc,
        oneMinuteAgo: {
          ...serverAcc.oneMinuteAgo,
          data: [...serverAcc.oneMinuteAgo.data, [updatedAt, oneMinuteAgo]]
        },
        fiveMinutesAgo: {
          ...serverAcc.oneMinuteAgo,
          data: [...serverAcc.fiveMinutesAgo.data, [updatedAt, fiveMinutesAgo]]
        },
        fifteenMinutesAgo: {
          ...serverAcc.fifteenMinutesAgo,
          data: [...serverAcc.fifteenMinutesAgo.data, [updatedAt, fifteenMinutesAgo]]
        }
      };
    }, {
      oneMinuteAgo: {
        name: 'Average load one minute ago',
        data: [],
      },
      fiveMinutesAgo: {
        name: 'Average load five minutes ago',
        data: []
      },
      fifteenMinutesAgo: {
        name: 'Average load fifteen minutes ago',
        data: []
      },
    });

    return [
      {
        name: oneMinuteAgo.name,
        data: oneMinuteAgo.data
      },
      {
        name: fiveMinutesAgo.name,
        data: fiveMinutesAgo.data
      },
      {
        name: fifteenMinutesAgo.name,
        data: fifteenMinutesAgo.data
      },
    ]
  }


}
