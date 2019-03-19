import { Component, Vue } from 'vue-property-decorator';
// @ts-ignore
import WithRender from './server.html';
// @ts-ignore
import { Chart } from 'highcharts-vue';
import { mapGetters } from 'vuex';
import { Gigabyte } from '../../shared/constants/pm2.constant';
import { memoryUsed, averageLoad } from '../../shared/constants/graph.constant';

@WithRender
@Component({
  components: {
    memoryComsuptionChart: Chart,
    averageLoadChartChart: Chart
  },
  computed: {
    gigabyte() {
      return Gigabyte;
    },
    memoryComsuption() {
      return {
        ...memoryUsed,
        series: memoryUsed.series.map(
          series => ({...series, data: this.$store.getters.memoryUsage })
        )
      }
    },
    averageLoad() {
      return {
        ...averageLoad,
        series: this.$store.getters.averageLoad
      }
    },
    ...mapGetters(['spec', 'hasBeenInit'])
  }
})
export default class Server extends Vue {}
