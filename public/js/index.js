

var binanceSocket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@bookTicker");

let tradeDiv = document.getElementById('trades')


// Arrays of x and y axes data
let xlabels = [];
let myArray = [];


const ctx = document.getElementById('mychart').getContext('2d');
// Configure the chart
const myChart = new Chart(ctx, {
  type: 'line',
  data: {
      labels: xlabels,
      datasets: [{
          pointRadius: 0, 
          label: 'BTC USD Price',
          data: myArray,
          backgroundColor: 'rgba(255, 99, 132, 1)',
          borderColor: 'rgba(255, 99, 132, 1)',
          color: 'rgba(255, 255, 255, 1)',
          borderWidth: 1
      }]
  },
  options: {
      datasets: {
        line: {
            pointRadius: 0 
        }
      },
      animation: {
        duration: 0
      },
      responsive: true,
      scales: {
        y: {
          min: 55000,
          max: 65000,
          gridLines: {
            color: 'rgba(255,255,255,1)',
            lineWidth: 0.5
          },
          ticks: {
            beginAtZero:true
          }
        },
        x: [{
          type: 'time',
          time: {
              format: "HH:MM:SS",
              unit: 'minute',                                                                                                                                                                       
              tooltipFormat: 'YYYY-MM-DD HH:mm',
              displayFormats: {
                  millisecond: 'HH:mm:ss.SSS',
                  second: 'HH:mm:ss',
                  minute: 'HH:mm',
                  hour: 'HH'
              }
          },
          ticks: {
            display: true,
            autoSkip: true,
            maxTicksLimit: 8
          },
          gridLines: {
            color: 'rgba(255,255,255,1)',
            lineWidth: 0.5
          },
          display: true,
          scaleLabel: {
              display: true,
              labelString: 'Time'
          }
        }],
      },
      plugins: {
        zoom: {
            pan: {
                enabled: true,
                mode: 'xy'
            },
            zoom: {
                enabled: true,
                mode: 'xy',
            }
        }
      }
    }
});

// Get Btcusd best ask prices(last 24h) and update the chart data
const getData = async () => {
  const getPriceResponse = await axios.get('/btcPrice')
  .then(function (response) {
    xlabels = [];
    myArray = [];
    // Set Graph Data
    response.data.forEach(data => {
      xlabels.push(data.createdAt);
      myArray.push(data.bestAskPrice);
    })
  })
  .catch(function (error) {
    console.log(error);
  });
}

// Store Btcusd best ask price data
const postData = async (priceObject) => {
    await axios.post('/btcPrice', priceObject)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    deposit = []
}

// Update the chart
const updateChart = async () => {
  console.log("Updated");
  myChart.update();
}

// Update the chart every 2 sec
setInterval(updateChart, 2000);

// Recent price data
let deposit = []

// Get live data
binanceSocket.onmessage = async function (event) {
 
    let messageObject = JSON.parse(event.data)


    // Show live current best ask price:
    document.getElementById('currAskPrice').textContent = parseFloat(messageObject.a);
    document.getElementById('lastUpdateAt').textContent = moment().format('MMMM Do YYYY, h:mm:ss a');
    
    myArray.push(parseFloat(messageObject.a))
    xlabels.push(moment().format('lll'))

    deposit.push({ bestAskPrice: parseFloat(messageObject.a), createdAt: new Date()})


    // Didn't store all incoming data to database because there is too much data
    if (deposit.length % 30 === 0) {
 
      postData({bestAskPrice: parseFloat(messageObject.a), createdAt: new Date()}).then(function (response) {
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      });
  
      deposit = []
     
    }
}


