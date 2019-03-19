export interface Server {
  freeMemory: number,
  totalMemory: number,
  cpu: {
    number: number,
    info: string,
  },
  type: string,
  pm2Version: string,
  updatedAt: string,
  averageLoad: number[],
  [key: string]: any,
}
