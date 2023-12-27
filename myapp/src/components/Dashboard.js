import React from 'react';
import { useNavigate } from "react-router-dom";
// import Chart from 'chart.js/auto';
import Chart from 'react-apexcharts';


const Dashboard = () => {
  // const [chartInstances, setChartInstances] = useState({});

  // // Sample data for pie charts
  // const pieChartData1 = useMemo(() => ({
  //   labels: ['Red', 'Blue', 'Yellow'],
  //   datasets: [
  //     {
  //       data: [300, 50, 100],
  //       backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
  //       hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
  //     },
  //   ],
  // }), []);

  // // Sample data for bar charts
  // const barChartData1 = useMemo(() => ({
  //   labels: ['January', 'February', 'March', 'April', 'May'],
  //   datasets: [
  //     {
  //       label: 'Dataset 1',
  //       backgroundColor: 'rgba(75,192,192,0.2)',
  //       borderColor: 'rgba(75,192,192,1)',
  //       borderWidth: 1,
  //       hoverBackgroundColor: 'rgba(75,192,192,0.4)',
  //       hoverBorderColor: 'rgba(75,192,192,1)',
  //       data: [65, 59, 80, 81, 56],
  //     },
  //   ],
  // }), []);
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/login');
  };

  const handleNavigateToCrud = () => {
    navigate('/crud'); // Change '/crud' to the actual route of your CRUD page
  };
 

  // useEffect(() => {
  //   // Destroy previous instances before rendering new charts
  //   Object.values(chartInstances).forEach((chartInstance) => {
  //     chartInstance.destroy();
  //   });
  
  //   // Render new charts and update the instances
  //   const pieCanvas = document.getElementById('pieChart1');
  //   const barCanvas = document.getElementById('barChart1');
  
  //   const newPieChart1 = new Chart(pieCanvas, {
  //     type: 'doughnut',
  //     data: pieChartData1,
  //   });
  
  //   const newBarChart1 = new Chart(barCanvas, {
  //     type: 'bar',
  //     data: barChartData1,
  //   });
  
  //   setChartInstances({
  //     pieChart1: newPieChart1,
  //     barChart1: newBarChart1,
  //   });
  // }, [pieChartData1, barChartData1, chartInstances]);
  
    const barChartData = {
      options: {
        chart: {
          id: 'bar-chart',
        },
        xaxis: {
          categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'],
        },
      },
      series: [
        {
          name: 'Series 1',
          data: [44, 55, 41, 64, 22],
        },
      ],
    };
  
    // Pie chart data
    const pieChartData = {
      options: {
        chart: {
          id: 'pie-chart',
        },
      },
      series: [30, 40, 45, 50],
      labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4'],
    };
  

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleNavigateToCrud}>Add and Edit User</button>
      <button
        onClick={handleLogout}
        style={{ position: 'absolute', top: '10px', right: '10px' }}
      >
        Logout
      </button>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
      {/* Bar Chart */}
      <div style={{ flex: '1', minWidth: '300px', margin: '10px' }}>
        <Chart options={barChartData.options} series={barChartData.series} type="bar" height={350} />
      </div>

      {/* Pie Chart */}
      <div style={{ flex: '1', minWidth: '300px', margin: '10px' }}>
        <Chart options={pieChartData.options} series={pieChartData.series} type="pie" height={350} />
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
