import { useEffect, useRef, useState } from 'react';
import ApexCharts from 'react-apexcharts';

function PieChart() {
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState<number[]>([]); // Specify the type as number[]
    const [chartLabels, setChartLabels] = useState<string[]>([]); // Specify the type as string[]

    useEffect(() => {
        // Data for the pie chart
        const data = [21676, 634, 1569, 2259, 108];
        // Labels for the pie chart
        const labels = ['Bus', 'Educational Institution Bus', 'Omni Bus', 'Omni Bus (Private Use)', 'e-Rickshaw(P)'];

        setChartData(data);
        setChartLabels(labels);

        const options = {
            series: data,
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: labels,
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        };

        if (chartRef.current) {
            const chart = new ApexCharts(chartRef.current, options);
            chart.render();
        }
    }, []);

    return (
        <div>
            <div id="chart" />
            <div>
                <h3>Total: {chartData.reduce((acc, curr) => acc + curr, 0)}</h3>
            </div>
        </div>
    );
}

export default PieChart;
