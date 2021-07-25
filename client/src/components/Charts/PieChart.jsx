import { Pie } from 'react-chartjs-2';

const PieChart = ({stats}) => {
    
    const data = {
        labels: [
          'Cashier',
          'Supervisor',
        ],
        datasets: [{
          label: 'Total',
          data: [stats.cashier, stats.supervisor],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
          ],
          hoverOffset: 10
        }]
      };
    return ( 
        <div>
            <h2>TOTAL</h2>
            <Pie data={data}
                height={300}
                width={300}
                responsive = {true}
            />
        </div>            
     );
}
 
export default PieChart;