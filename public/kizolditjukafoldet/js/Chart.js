class Chart{

constructor(){
google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawStacked);

let apiVegpontStatisztika = '/statisztika';
let adatTomb=[];
const token = $('meta[name="csrf-token"]').attr("content");
const myAjax = new MyAjax(token);

myAjax.getAjax(apiVegpontStatisztika,adatTomb,function(adatTomb){ 
    const dataArray=new Array();
    dataArray.push(['Osztály','Összpontszám',{ role: 'style' }]);// fejlécek
    adatTomb.forEach(element => {
        dataArray.push([element.osztalyId,Number(element.osszpontszam),'color: green']); //csak az értékeket pakolom át a kulcsok kihagyásával
    });     
    drawStacked(dataArray);
});

function drawStacked(dataArray) {    
    
      var chartData = google.visualization.arrayToDataTable(dataArray);      

      var options = {
        title: 'Összpontszám osztályonként',
        chartArea: {width: '50%'},
        isStacked: true,
        hAxis: {
          title: 'Pontszám',
          minValue: 0,
        },
        vAxis: {
          title: 'Osztály'
        }
      };
      var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
      chart.draw(chartData, options);
    }
}
}