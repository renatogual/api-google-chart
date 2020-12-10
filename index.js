const dadosAtivas = [];
const dadosReceptivas = [];
const dadosInternas = [];

async function getDados() {
  let response = await fetch(`./dados.json`);
  let data = await response.json();
  
  dadosAtivas.push(data.Dados.filter(itens => itens[0].toLowerCase() === 'ativa'));
  dadosReceptivas.push(data.Dados.filter(itens => itens[0].toLowerCase() === 'receptiva'));
  dadosInternas.push(data.Dados.filter(itens => itens[0].toLowerCase() === 'interna'));
}

function dataTable(tipo) {
  let dataFormated = tipo.flat().map(item => item.slice(1,3));

  // Create the data table.
  let dataTable = new google.visualization.DataTable();
  dataTable.addColumn('string');
  dataTable.addColumn('number');
  dataTable.addRows(dataFormated);

  return dataTable
}

function pieChartActives(data) {
  // Set Pie chart options
  let piechart_options = {
    'title': 'Ligações Ativas',
    'is3D': true,
    'width':900,
    'height':500,
  };

  // Instantiate and draw our Pie chart, passing in some options.
  let piechart_div_actives = document.getElementById('chart_pie_actives');
  let piechart_actives = new google.visualization.PieChart(piechart_div_actives);
  piechart_actives.draw(data, piechart_options);
}

function pieChartReceptives(data) {
  // Set Pie chart options
  let piechart_options = {
    'title': 'Ligações Receptivas',
    'is3D': true,
    'width':900,
    'height':500,
  };

  let piechart_div_receptives = document.getElementById('chart_pie_receptives');
  let piechart_receptives = new google.visualization.PieChart(piechart_div_receptives);
  piechart_receptives.draw(data, piechart_options);
}

function pieChartInternals(data) {
  // Set Pie chart options
  let piechart_options = {
    'title': 'Ligações Internas',
    'is3D': true,
    'width':900,
    'height':500,
  };

  let piechart_div_internals = document.getElementById('chart_pie_internals');
  let piechart_internals = new google.visualization.PieChart(piechart_div_internals);
  piechart_internals.draw(data, piechart_options);
}

function columnChartActives(data) {
  // Set Column chart options
  let columnchart_options = {
    'width':900,
    'height':500,
  };

  // Instantiate and draw our Pie chart, passing in some options.
  let columnchart_div_actives = document.getElementById('chart_column_actives');
  let columnchart_actives = new google.visualization.ColumnChart(columnchart_div_actives);
  columnchart_actives.draw(data, columnchart_options);
}

function columnChartReceptives(data) {
  // Set Column chart options
  let columnchart_options = {
    'width':900,
    'height':500,
  };

  let columnchart_div_receptives = document.getElementById('chart_column_receptives');
  let columnchart_receptives = new google.visualization.ColumnChart(columnchart_div_receptives);
  columnchart_receptives.draw(data, columnchart_options);
}

function columnChartInternals(data) {
  // Set Column chart options
  let columnchart_options = {
    'width':900,
    'height':500,
  };

  let columnchart_div_internals = document.getElementById('chart_column_internals');
  let columnchart_internals = new google.visualization.ColumnChart(columnchart_div_internals);
  columnchart_internals.draw(data, columnchart_options);
}

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChartActives() {
  let data = dataTable(dadosAtivas);
  pieChartActives(data);
  columnChartActives(data);
}

function drawChartReceptives() {
  let data = dataTable(dadosReceptivas);
  pieChartReceptives(data);
  columnChartReceptives(data);
}

function drawChartInternals() {
  let data = dataTable(dadosInternas);
  pieChartInternals(data);
  columnChartInternals(data);
}

$(document).ready(function(){
  $('.tabs').tabs();
  
  getDados();

  // Load the Visualization API and the corechart package.
  google.charts.load('current', {'packages':['corechart'], 'language': 'pt-br'});

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawChartActives);
  google.charts.setOnLoadCallback(drawChartReceptives);
  google.charts.setOnLoadCallback(drawChartInternals);
});
