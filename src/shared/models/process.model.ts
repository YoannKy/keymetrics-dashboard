export interface Process {
  cpu: number;
  name: string;
  createdAt: number;
  memory: number;
  status: string;
  uniqueId: string;
  versioning: string;
  watching: boolean;
  uptime: number;
  cpuHistory: number[];
  memoryHistory: number[];
  [key: string]: any;
}
