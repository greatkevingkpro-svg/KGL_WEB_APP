// SALES LINE CHART
new Chart(document.getElementById('salesChart'), {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Sales (UGX)',
      data: [5000000, 7000000, 6000000, 9000000, 8500000, 10000000],
      borderColor: '#4f46e5',
      backgroundColor: 'rgba(79,70,229,0.2)',
      tension: 0.4,
      fill: true
    }]
  },
  options: {
    plugins: { legend: { labels: { color: 'black' } } },
    scales: {
      x: { ticks: { color: 'black' } },
      y: { ticks: { color: 'black' } }
    }
  }
});

// STOCK BAR CHART
new Chart(document.getElementById('stockChart'), {
  type: 'bar', // changed from 'pie' to 'bar'
  data: {
    labels: ['Beans', 'Maize', 'Cow Peas', 'G-nuts', 'Soybeans'],
    datasets: [{
      label: 'Stock Quantity (kgs)', // optional label for dataset
      data: [5000, 4000, 3000, 3500, 3000],
      backgroundColor: [
        '#4f46e5',
        '#22c55e',
        '#f59e0b',
        '#ef4444',
        '#06b6d4'
      ]
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false // hide legend for a simple bar chart
      },
      title: {
        display: true,
        text: 'Stock Quantities by Product'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});