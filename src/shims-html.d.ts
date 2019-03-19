import Vue, { ComponentOptions, FunctionalComponentOptions } from 'vue';
declare module '*.html' {
    interface WithRender {
        <V extends Vue, U extends ComponentOptions<V> | FunctionalComponentOptions>(options: U): U;
        <V extends typeof Vue>(component: V): V;
    }

    const withRender: WithRender;
    export default withRender;
}
