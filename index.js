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
  dataTable.addColumn('string', 'Qualificação');
  dataTable.addColumn('number', 'Quantidade');
  dataTable.addRows(dataFormated); // Cada linha representa uma fatia ou uma barra dos gráficos de pizza e colunas

  return dataTable;
}

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChartActives() {
  let data = dataTable(dadosAtivas);

  // Set Pie chart options
  let piechart_actives_options = {
    title: 'Pie Chart Actives',
    width: 800,
    height: 700,
  }

  let piechart_actives = new google.visualization.PieChart($('#chart_pie_actives')[0]);
  piechart_actives.draw(data, piechart_actives_options);

  // Set Column chart options
  let columnchart_actives_options = {
    'title': 'Column Chart Actives',
    'width': 800,
    'height': 700,
  }

  let columnchart_actives = new google.visualization.ColumnChart($('#chart_column_actives')[0]);
  columnchart_actives.draw(data, columnchart_actives_options);
}

function drawChartReceptives() {
  let data = dataTable(dadosReceptivas);

  let piechart_receptives_options = {
    title: 'Pie Chart Receptives',
    width: 800,
    height: 700,
  }
  
  let piechart_receptives = new google.visualization.PieChart($('#chart_pie_receptives')[0]);
  piechart_receptives.draw(data, piechart_receptives_options);

  let columnchart_receptives_options = {
    'title': 'Column Chart Receptives',
    'width': 800,
    'height': 700,
  }

  let columnchart_receptives = new google.visualization.ColumnChart($('#chart_column_receptives')[0]);
  columnchart_receptives.draw(data, columnchart_receptives_options);
}

function drawChartInternals() {
  let data = dataTable(dadosInternas);

  let piechart_internals_options = {
    title: 'Pie Chart Internals',
    width: 800,
    height: 700,
  }
  
  let piechart_internals = new google.visualization.PieChart($('#chart_pie_internals')[0]);
  piechart_internals.draw(data, piechart_internals_options);

  let columnchart_internals_options = {
    'title': 'Column Chart Internals',
    'width': 800,
    'height': 700,
  }

  let columnchart_internals = new google.visualization.ColumnChart($('#chart_column_internals')[0]);
  columnchart_internals.draw(data, columnchart_internals_options);
}

$(() => {
  $('ul.tabs').tabs({
    swipeable : true,
  });

  getDados();

  // Load the Visualization API and the corechart package.
  google.charts.load('current', {'packages':['corechart'], 'language': 'pt-br'})
    .then(drawChartActives)
    .then(drawChartReceptives)
    .then(drawChartInternals);

  // Set a callback to run when the Google Visualization API is loaded.
  // google.charts.setOnLoadCallback(drawChartActives);
  // google.charts.setOnLoadCallback(drawChartReceptives);
  // google.charts.setOnLoadCallback(drawChartInternals);
});
