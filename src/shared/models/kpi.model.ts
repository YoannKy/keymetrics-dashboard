import { Process } from './process.model';
import { Server } from './server.model';

export interface Kpi {
  process: Process[],
  server: Server
}
