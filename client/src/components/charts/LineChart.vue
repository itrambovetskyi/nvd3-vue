<template>
    <div :id="id" :width="options.width" :height="options.height">
        <svg></svg>
    </div>
</template>

<script>
    import * as d3 from "d3";
    import nv from 'nvd3';
    import shortId from 'shortid';
    import _ from 'lodash';

    const defaultOptions = {
        duration: 0,
        useInteractiveGuideline: true,
        isArea: false,
        width: 600,
        height: 300,
        showLabels: true,
        showLegend: true,
        rightAlignYAxis: false,
        showVoronoi: false,
        showXAxis: true,
        showYAxis: true,
        legendPosition: `top`,
        margin: {
            top: 30,
            right: 20,
            bottom: 50,
            left: 60
        },
        noData: `No Data Available.`,
        useVoronoi: true
    };
    const defaultXAxis = {
        label: `X Axis Label`,
        format: d3.format(',.1f')
    };
    const defaultYAxis = {
        label: `Y Axis Label`,
        format: d3.format(',.1f')
    };

    let chart;

    export default {
        name: `LineChart`,
        props: {
            chartData: {
                type: Array,
                default: () => []
            },
            options: {
                type: Object,
                default: () => defaultOptions
            },
            xAxis: {
                type: Object,
                default: () => defaultXAxis
            },
            yAxis: {
                type: Object,
                default: () => defaultYAxis
            }
        },
        data() {
            return {
                id: shortId.generate()
            }
        },
        mounted() {
            const me = this;

            const options = _.merge(defaultOptions, me.options);
            const xAxis = _.merge(defaultXAxis, me.xAxis);
            const yAxis = _.merge(defaultYAxis, me.yAxis);

            nv.addGraph(() => {
                chart = nv.models.lineChart().options(options);

                chart.xAxis
                    .axisLabel(xAxis.label)
                    .axisLabelDistance()
//                    .domain()
//                    .duration()
//                    .fontSize()
//                    .height()
//                    .margin()
//                    .orient()
//                    .range()
//                    .rangeBand()
//                    .rangeBands()
//                    .rotateLabels()
//                    .
                ;

                chart.yAxis
                    .axisLabel(yAxis.label);

                d3.select(`#${me.id} svg`)
                    .style('height', options.height)
                    .style('width', options.width)
                    .datum(me.chartData)
                    .call(chart);

                nv.utils.windowResize(chart.update);

                return chart;
            });
        },
        computed: {},
        watch: {
            chartData: {
                handler: _.debounce(() => chart.update(), 100),
                deep: true
            },
            options: {
                handler: _.debounce(() => chart.update(), 100),
                deep: true
            }
        }
    }
</script>

<style scoped>
    @import "~nvd3/build/nv.d3.css";
</style>
