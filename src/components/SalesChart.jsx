import  { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

import { DateTime } from 'luxon'; 
import 'chartjs-adapter-luxon';

import { useGetPaymentQuery } from "../app/PaymentApi";
const SalesChart = () => {
  const { data: bkash, isLoading} = useGetPaymentQuery();
  const chartRef = useRef(null); 
  const chartInstance = useRef(null); 
  const [soldProductsCount, setSoldProductsCount] = useState(0); 

  useEffect(() => {
    const processData = (products) => {
      const monthlySales = {};
      for (let i = 1; i <= 12; i++) {
        const monthYear = DateTime.local().set({ month: i }).toFormat('yyyy-MM'); 
        monthlySales[monthYear] = 0;
      }

      products.forEach(product => {
        if (product.status.S === 'complete') {
          const date = DateTime.fromISO(product.created.S);
          const monthYear = date.toFormat('yyyy-MM'); 
          if (monthlySales[monthYear] !== undefined) {
            monthlySales[monthYear] += Number(product?.amount?.N); 
          }
        }
      });

      return {
        labels: Object.keys(monthlySales), 
        values: Object.values(monthlySales) 
      };
    };

    if (bkash && !isLoading) {

      const { labels, values } = processData(bkash);

      const data = {
        labels: labels.map(label => DateTime.fromFormat(label, 'yyyy-MM').toFormat('MMM yyyy')), 
        datasets: [{
          label: 'Monthly Sales',
          data: values,
          backgroundColor: generateColorArray(labels.length),
          borderWidth: 1
        }]
      };


      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Month'
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Sales Amount'
              },
              ticks: {
                stepSize: 5, 
                suggestedMin: 0, 
                suggestedMax: 50 
              }
            }
          }
        }
      });
    }
  }, [bkash, isLoading]); 
  const generateColorArray = (length) => {
    const colors = [];
    const baseColors = [
      'rgba(255, 99, 132, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(255, 206, 86, 0.6)',
      'rgba(75, 192, 192, 0.6)',
      'rgba(153, 102, 255, 0.6)',
      'rgba(255, 159, 64, 0.6)',
      'rgba(255, 99, 132, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(255, 206, 86, 0.6)',
      'rgba(75, 192, 192, 0.6)',
      'rgba(153, 102, 255, 0.6)',
      'rgba(255, 159, 64, 0.6)'
    ];

    for (let i = 0; i < length; i++) {
      colors.push(baseColors[i % baseColors.length]); 
    }
    return colors;
  };

  return (
    <div className="mt-5">
      <h2>Monthly Sales</h2>
      <p>Total Sold Products: {soldProductsCount}</p>
      <canvas ref={chartRef} id="myBarChart" width="400" height="200"></canvas>
    </div>
  );
};

export default SalesChart;
