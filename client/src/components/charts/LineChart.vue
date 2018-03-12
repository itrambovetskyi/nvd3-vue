<template>
    <div :id="id" :width="width" :height="height">
        <svg></svg>
    </div>
</template>

<script>
    import * as d3 from "d3";
    import nv from 'nvd3';
    import shortId from 'shortid';
    import _ from 'lodash';

    let chart;

    export default {
        name: `LineChart`,
        props: {
            chartData: {
                type: Array,
                default: () => ([])
            },
            options: {
                type: Object,
                default: () => ({
                    duration: 0,
                    useInteractiveGuideline: true
                })
            },
            xAxis: {
                type: Object,
                default: () => ({
                    label: `X Axis Label`,
                    format: d3.format(',.1f')
                })
            },
            yAxis: {
                type: Object,
                default: () => ({
                    label: `Y Axis Label`,
                    format: d3.format(',.1f')
                })
            },
            height: {
                type: Number,
                default: 300
            },
            width: {
                type: Number,
                default: 600
            },
        },
        data() {
            return {
                id: shortId.generate()
            }
        },
        mounted() {
            const me = this;

            nv.addGraph(() => {
                chart = nv.models.lineChart().options(me.options);

                chart.width(me.width);
                chart.height(me.height);

                chart.xAxis
                    .axisLabel(me.xAxis.label)
                    .tickFormat(me.xAxis.format)
                    .staggerLabels(true);

                chart.yAxis
                    .axisLabel(me.yAxis.label)
                    .tickFormat(me.yAxis.format);

                d3.select(`#${me.id} svg`)
                    .style('height', me.height)
                    .style('width', me.width)
                    .datum(me.chartData)
                    .call(chart);

                nv.utils.windowResize(chart.update);

                return chart;
            });
        },
        computed: {},
        watch: {
            chartData: {
                handler: _.debounce(() => chart.update(), 50),
                deep: true
            }
        }
    }
</script>

<style scoped>
    @import "~nvd3/build/nv.d3.css";
</style>
