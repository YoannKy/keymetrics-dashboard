import { Component, Vue } from 'vue-property-decorator';
// @ts-ignore
import WithRender from './process.html';
// @ts-ignore
import { Chart } from 'highcharts-vue';
import { mapGetters } from 'vuex';
import { memoryUsageProcess, memoryAndCpu } from '../../shared/constants/graph.constant';

@WithRender
@Component({
  components: {
    memoryProcessChart  : Chart,
    processStateChart: Chart
  },
  computed: {
    treemapOptions() {
      return {
        ...memoryUsageProcess,
        series: memoryUsageProcess.series.map(
          series => ({...series, data: this.$store.getters.memoryUsageByProcess })
        )
      }
    },
    axesAndColumns() {
      return {
        ...memoryAndCpu,
        series: this.$store.getters.memoryAndCpu
       }
    },
    ...mapGetters(['hasBeenInit'])
  }
})
export default class Process extends Vue {
}
