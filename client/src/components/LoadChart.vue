<template>
    <line-chart :chart-data="chartData"></line-chart>
</template>

<script>
    import LineChart from './charts/LineChart';

    const chartData = [{
        key: "Cosine Wave",
        color: "#2ca02c",
        values: []
    }];

    let counter = 0;
    setInterval(() => {
        chartData[0].values.push({
            x: counter,
            //y: Math.sin(counter / (100 / (Math.PI*2))) + Math.random() * 0.2
            y: Math.random()
        });

        if (counter > 200) {
            chartData[0].values.shift();
        }

        counter++;
    }, 100);

    export default {
        name: 'LoadChart',
        components: {LineChart},
        data() {
            return {
                chartData: chartData
            }
        },
        computed: {},
        methods: {}
    }
</script>

<style scoped>

</style>
