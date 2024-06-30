import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useGetOrderQuery } from '../app/OrderApi'; // Adjust the path as per your project structure
import { DateTime } from 'luxon'; // Import Luxon for date handling
import 'chartjs-adapter-luxon'; // Import the Chart.js Luxon adapter

const ChartComponent = () => {
  const { data: orderdata, isLoading: orderIsLoading } = useGetOrderQuery(); // Fetch order data using a custom hook
  const chartRef = useRef(null); // Reference to the canvas element
  const chartInstance = useRef(null); // Reference to the Chart.js instance

  useEffect(() => {
    // Function to process order data into monthly counts
    const processData = (orders) => {
      const monthlyCounts = {};

      // Iterate through orders and count them per month
      orders.forEach(order => {
        const date = DateTime.fromISO(order.created.S);
        const month = date.month; // Get month number (1-12)
        const monthName = date.monthLong; // Get full month name (e.g., "January", "February", etc.)

        if (!monthlyCounts[month]) {
          monthlyCounts[month] = {
            count: 0,
            monthName: monthName
          };
        }
        monthlyCounts[month].count++;
      });

      // Fill in missing months with zero counts
      for (let i = 1; i <= 12; i++) {
        if (!monthlyCounts[i]) {
          const date = DateTime.fromObject({ month: i });
          monthlyCounts[i] = {
            count: 0,
            monthName: date.monthLong
          };
        }
      }

      // Sort by month number
      const sortedCounts = Object.keys(monthlyCounts)
        .sort((a, b) => parseInt(a) - parseInt(b))
        .map(key => ({
          monthName: monthlyCounts[key].monthName,
          count: monthlyCounts[key].count
        }));

      return {
        labels: sortedCounts.map(item => item.monthName), // Array of month names
        values: sortedCounts.map(item => item.count) // Array of order counts per month
      };
    };

    if (orderdata && !orderIsLoading) {
      // Process order data into monthly counts
      const { labels, values } = processData(orderdata);

      // Prepare data object for Chart.js
      const data = {
        labels: labels,
        datasets: [{
          label: 'Monthly Order Count',
          data: values,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',   // January - Red
            'rgba(54, 162, 235, 0.2)',   // February - Blue
            'rgba(255, 206, 86, 0.2)',   // March - Yellow
            'rgba(75, 192, 192, 0.2)',   // April - Teal
            'rgba(153, 102, 255, 0.2)',  // May - Purple
            'rgba(255, 159, 64, 0.2)',   // June - Orange
            'rgba(0, 128, 0, 0.2)',      // July - Green
            'rgba(128, 0, 128, 0.2)',    // August - Purple
            'rgba(128, 128, 0, 0.2)',    // September - Olive
            'rgba(210, 105, 30, 0.2)',   // October - Chocolate
            'rgba(255, 182, 193, 0.2)',  // November - Pink
            'rgba(255, 215, 0, 0.2)'     // December - Gold
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',    // January - Red
            'rgba(54, 162, 235, 1)',    // February - Blue
            'rgba(255, 206, 86, 1)',    // March - Yellow
            'rgba(75, 192, 192, 1)',    // April - Teal
            'rgba(153, 102, 255, 1)',   // May - Purple
            'rgba(255, 159, 64, 1)',    // June - Orange
            'rgba(0, 128, 0, 1)',       // July - Green
            'rgba(128, 0, 128, 1)',     // August - Purple
            'rgba(128, 128, 0, 1)',     // September - Olive
            'rgba(210, 105, 30, 1)',    // October - Chocolate
            'rgba(255, 182, 193, 1)',   // November - Pink
            'rgba(255, 215, 0, 1)'      // December - Gold
          ],
          borderWidth: 1
        }]
      };

      // Destroy existing chart instance to avoid memory leaks
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create new Chart.js instance
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
                text: 'Order Count'
              },
              ticks: {
                stepSize: 5, // Interval between ticks
                suggestedMin: 0, // Minimum value of the axis
                suggestedMax: 50 // Maximum value of the axis
              }
            }
          }
        }
      });
    }
  }, [orderdata, orderIsLoading]); // Dependency array ensures useEffect runs when data or loading state changes

  return (
    <div className="mt-5">
      <h2>Monthly Order</h2>
      <canvas ref={chartRef} id="myBarChart" width="400" height="200"></canvas>
    </div>
  );
};

export default ChartComponent;
