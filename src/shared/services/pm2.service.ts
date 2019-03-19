// @ts-ignore
import Pm2iApi from '@pm2/js-api';
import { fromEventPattern, from, Observable } from 'rxjs';
import { tap, flatMap, throttleTime } from 'rxjs/operators';

import { client_id, refresh_token, bucket_id } from '../config/pm2.config.json';

class Pm2Service {
  private client: any;
  private bucket: any;

  constructor() {
   this.client = new Pm2iApi();
   this.client.use('standalone', {
    client_id,
    refresh_token,
   });
  }

  public getServerStatus(eventType: string): Observable<any> {
    return from(this.client.bucket.retrieve(bucket_id))
      .pipe(
        tap((res: any) => this.bucket = res.data),
        flatMap(this.getBucketInfo.bind(this, eventType)),
        throttleTime(1000)
      );
  }

  private getBucketInfo(eventType: string): Observable<any> {

    return fromEventPattern(
      (handler) => {
        this.client.realtime.subscribe(bucket_id);
        this.client.realtime.on(`${this.bucket.public_id}:${eventType}`, handler);
      },
    );
  }
}

export const pm2Service = new Pm2Service();
