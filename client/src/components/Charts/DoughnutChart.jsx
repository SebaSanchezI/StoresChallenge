import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({stats}) => {
    
    const data = {
        labels: [
            '% Cashier' ,
            '% Supervisor',
        ],
        datasets: [{
            label: 'Total in percentage',
            data: [Number.parseFloat(stats.porcent_cashier).toFixed(2) , Number.parseFloat(stats.porcent_supervisor).toFixed(2)],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 205, 86)'
            ],
        hoverOffset: 10
        }]
      };

    return ( 
        <div>
            <h2>TOTAL %</h2>
            <Doughnut 
                data={data}
                height={300}
                width={300}
                responsive = {true}
            />
        </div>
     )
}
 
export default DoughnutChart;