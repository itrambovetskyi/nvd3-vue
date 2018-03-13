<template>
    <line-chart :chart-data="chartData"
                :options="chartOptions">
    </line-chart>
</template>

<script>
    import LineChart from './charts/LineChart';

    const chartData = [{
        key: "Sinus Wave",
        color: "#2ca02c",
        values: []
    }, {
        key: "Cosine Wave",
        color: "#ffa02c",
        values: []
    }];

    const chartOptions = {
        width: 800,
        height: 400
    };

    let counter = 0;
    setInterval(() => {
        chartData[0].values.push({
            x: counter,
            y: Math.sin(counter / (35 / (Math.PI*2)))
        });
        chartData[1].values.push({
            x: counter,
            y: Math.cos(counter / (35 / (Math.PI*2)))
        });

        if (counter > 70) {
            chartData[0].values.shift();
            chartData[1].values.shift();
        }

        counter++;
    }, 500);

    export default {
        name: 'LoadChart',
        components: {LineChart},
        data() {
            return {
                chartData: chartData,
                chartOptions: chartOptions
            }
        },
        computed: {},
        methods: {}
    }
</script>

<style scoped>

</style>
