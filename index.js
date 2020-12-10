const dadosAtivas = [];
const dadosReceptivas = [];
const dadosInternas = [];

// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart'], 'language': 'pt-br'});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChartActives);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
async function drawChartActives() {
  let dados = dadosAtivas.flat().map(item => item.slice(1,3))

  // Create the data table.
  let data = new google.visualization.DataTable();
  data.addColumn('string');
  data.addColumn('number');
  data.addRows(dados);

  // Set Pie chart options
  let piechart_options = {
    'title':'Ligações Ativas',
    'is3D': true,
    'width':900,
    'height':500,
  };

  // Instantiate and draw our Pie chart, passing in some options.
  let piechart_div = document.getElementById('chart_pie_actives');
  let piechart = new google.visualization.PieChart(piechart_div);
  piechart.draw(data, piechart_options);
  
  // Set Column chart options
    let columnchart_options = {
    'title':'Ligações Ativas',
    'width':900,
    'height':500,
  };

  // Instantiate and draw our Column chart, passing in some options.
  let columnchart_div = document.getElementById('chart_column_actives');
  let columnchart = new google.visualization.ColumnChart(columnchart_div);
  columnchart.draw(data, columnchart_options);
}

async function getDados() {
  let response = await fetch(`./dados.json`);
  let data = await response.json();
  
  dadosAtivas.push(data.Dados.filter(itens => itens[0].toLowerCase() === 'ativa'));
  dadosReceptivas.push(data.Dados.filter(itens => itens[0].toLowerCase() === 'receptiva'));
  dadosInternas.push(data.Dados.filter(itens => itens[0].toLowerCase() === 'interna'));
}

$(document).ready(function(){
  $('.tabs').tabs();
  
  getDados();
});
