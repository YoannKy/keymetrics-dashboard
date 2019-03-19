import { Component, Vue } from 'vue-property-decorator';
// @ts-ignore
import WithRender from './dashboard.html';
import { pm2Service } from '../shared/services/pm2.service';
import ProcessComponent from '../components/process/process';
import ServerComponent from '../components/server/server';
import { Kpi } from '../shared/models/kpi.model';
import { SET_PROCESS, SET_SERVER, SET_SPEC, SET_HAS_BEEN_INIT } from '../shared/constants/pm2.constant';
import { Process } from '../shared/models/process.model';
import pm2Store from '../store/store';

@WithRender
@Component({
  components: {
    ProcessComponent,
    ServerComponent,
  },
})
export default class Dashboard extends Vue {
  constructor() {
     super();
  }

  public mounted() {
    pm2Service.getServerStatus('*:status').subscribe(({ data } : { data: Kpi }) => {
      data.process.forEach((process: Process) => {
        pm2Store.commit(SET_PROCESS, process);
      });
      pm2Store.commit(SET_SERVER, data.server);
      pm2Store.commit(SET_SPEC, data.server);
      pm2Store.commit(SET_HAS_BEEN_INIT, true);
    });
  }
}
