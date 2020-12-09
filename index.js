// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart'], 'language': 'pt-br'});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChartPie);
google.charts.setOnLoadCallback(drawChartColumn);
google.charts.setOnLoadCallback(drawChartLine);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
async function drawChartPie() {
  let dados = await getDados();
  // Create the data table.
  let data = new google.visualization.DataTable();
  data.addColumn('string');
  data.addColumn('number');
  data.addRows(dados.Dados);

  // Set chart options
  let options = {
    'title':'Gráfico de teste',
    // 'is3D': true,
    'legend': {},
    'width':900,
    'height':500,
  };

  // Instantiate and draw our chart, passing in some options.
  let chart = new google.visualization.PieChart(document.getElementById('chart_pie'));
  chart.draw(data, options);
}

async function drawChartColumn() {
  let dados = await getDados();
  // Create the data table.
  let data = new google.visualization.DataTable();
  data.addColumn('string');
  data.addColumn('number');
  data.addRows(dados.Dados);

  // Set chart options
  let options = {
    'title':'Gráfico de teste',
    'width':900,
    'height':500,
  };

  // Instantiate and draw our chart, passing in some options.
  let chart = new google.visualization.ColumnChart(document.getElementById('chart_column'));
  chart.draw(data, options);
}

async function drawChartLine() {
  let dados = await getDados();
  // Create the data table.
  let data = new google.visualization.DataTable();
  data.addColumn('string');
  data.addColumn('number');
  data.addRows(dados.Dados);

  // Set chart options
  let options = {
    'title':'Gráfico de teste',
    'width':900,
    'height':500,
  };

  // Instantiate and draw our chart, passing in some options.
  let chart = new google.visualization.LineChart(document.getElementById('chart_line'));
  chart.draw(data, options);
}

async function getDados() {
  let response = await fetch(`./dados.json`);
  let data = await response.json();
  return data
}

$(document).ready(function(){
  $('.tabs').tabs();
});
