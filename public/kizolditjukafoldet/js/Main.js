
//oldal betöltődésekor
$(function(){
  new Urlapkezeles(); 
  new Chart();   
});


class Urlapkezeles{
 constructor(){
    const osztalyokApiVegpont='/osztalyok';
    const tevekenysegekApiVegpont ='/tevekenyseg/osszes';
    const bejegyzesekApiVegpont = '/bejegyzes/osszes';
    const ujBejegyzesApiVegpont = "/bejegyzes/beszur";
    const osztalyokTomb = [];
    const tevekenysegekTomb = [];
    const bejegyzesekTomb = [];    
    const token = $('meta[name="csrf-token"]').attr("content");
    const myAjax = new MyAjax(token);
    const bejegyzesLista = new BejegyzesLista();
   // this.bejegyzesKontener = $('#bejegyzes-lista'); //nem működött, ezért inkább közvetlenül a selectorra hivatkoztam
   // this.tevekenysegekDropdown = $('#tevekenysegek'); //nem működött
   //  this.osztalyokDropdown = $("#osztalyok"); //nem működött
  

     myAjax.getAjax(osztalyokApiVegpont,osztalyokTomb,this.osztalyAdatokImport); //osztályadatok betöltése a form dropdown menübe
     myAjax.getAjax(tevekenysegekApiVegpont,tevekenysegekTomb,this.tevekenysegAdatokImport); //tevékenységadatok betöltése a dropdown menübe
     myAjax.getAjax(bejegyzesekApiVegpont,bejegyzesekTomb,bejegyzesLista.bejegyzesListFelepit); //tevékenységadatok betöltése a dropdown menübe
     myAjax.getAjax(osztalyokApiVegpont,osztalyokTomb,this.osztalyAdatokSzureshez); //osztályadatok betöltése a szűrésre szolgáló dropdown menübe

    this.kivalasztBeszurandoAdat()
    
   //beszúrandó új rekord adatainak elküldése a szerveroldal felé
    $(window).on("ujAdatBeszur", (event) => {
        let ujAdat = event.detail;        
        myAjax.postAjax(ujBejegyzesApiVegpont, ujAdat);
        //megjelenítés
        $('#bejegyzes-lista').empty();      
        myAjax.getAjax(bejegyzesekApiVegpont,bejegyzesekTomb,bejegyzesLista.bejegyzesListFelepit);
        location.reload(); //újratöltöm az oldalt, hogy a grafikonadatok is frissüljenek
    });

     this.kereses();  
     this.getRendezesiAttributum();
     rendez();

     $("#szures-osztalyra").on("change",()=> {   
     let aktOsztalyId = $("#szures-osztalyra").val();
     if(!(aktOsztalyId==='0')){
        let apiVegpontSzures = 'bejegyzesek/'+aktOsztalyId;        
        $('#bejegyzes-lista').empty();
        myAjax.getAjax(apiVegpontSzures,bejegyzesekTomb,bejegyzesLista.bejegyzesListFelepit);
     }else {      
        $('#bejegyzes-lista').empty();
        myAjax.getAjax(bejegyzesekApiVegpont,bejegyzesekTomb,bejegyzesLista.bejegyzesListFelepit);
     }
    
 });


     function rendez(){
     let asc=true;
     $(window).on("rendezesiAttributum", (event) => {
       let attributum = event.detail;  
      
        myAjax.getAjax(bejegyzesekApiVegpont,bejegyzesekTomb, function(){ //friss adatlista lekérése
            //console.log(bejegyzesekTomb)
            $('#bejegyzes-lista').empty();
             //komplex kulcs esetén
            if(attributum==='tevekenyseg.pontszam' || attributum==='tevekenyseg.nev'){
                asc ? sortByKeyAscComplex(bejegyzesekTomb,attributum) : sortByKeyDescComplex(bejegyzesekTomb,attributum);
            }else{
                //szimpla kulcs esetén 
                asc ? sortByKeyAsc(bejegyzesekTomb,attributum) : sortByKeyDesc(bejegyzesekTomb,attributum);
            }
             bejegyzesLista.bejegyzesListFelepit(bejegyzesekTomb);
           })   
           asc=!asc;   
     });     
    }

     //csökkenő sorrendbe történő rendezés - szimpla kulcsra, tehát pl. elem.osztalyId / elem[osztalyId], amelyből a kulcs osztalyId
     function sortByKeyDesc(array, key) {
        return array.sort(function (a, b) {         
            return ((a[key]> b[key]) ? -1 : ((a[key] < b[key]) ? 1 : 0));
        });
    }
    
    //növekvő sorrendbe történő rendezés - szimpla kulcsra, tehát pl. elem.osztalyId / elem[osztalyId], amelyből a kulcs osztalyId
    function sortByKeyAsc(array, key) {
        return array.sort(function (a, b) {          
            return ((a[key]< b[key]) ? -1 : ((a[key] > b[key]) ? 1 : 0));
        });
    }


      //csökkenő sorrendbe történő rendezés - komplex kulcsra, tehát pl. elem.tevekenyseg.pontszam / elem[tevekenyseg][pontszam], amelyből a kulcs tevekenyseg.pontszam
      function sortByKeyDescComplex(array, complexKey) {
        let keyOuter = complexKey.split(".")[0];
        let keyInner = complexKey.split(".")[1];
        return array.sort(function (a, b) {         
            return ((a[keyOuter][keyInner]> b[keyOuter][keyInner]) ? -1 : ((a[keyOuter][keyInner] < b[keyOuter][keyInner]) ? 1 : 0));
        });
    }


    //növekvő sorrendbe történő rendezés - komplex kulcsra, tehát pl. elem.tevekenyseg.pontszam / elem[tevekenyseg][pontszam], amelyből a kulcs tevekenyseg.pontszam
    function sortByKeyAscComplex(array, complexKey) {
        let keyOuter = complexKey.split(".")[0];
        let keyInner = complexKey.split(".")[1];
        return array.sort(function (a, b) {         
            return ((a[keyOuter][keyInner]< b[keyOuter][keyInner]) ? -1 : ((a[keyOuter][keyInner] > b[keyOuter][keyInner]) ? 1 : 0));
        });
    }    
 }  
 
 
 osztalyAdatokImport(tomb) {    
    tomb.forEach((element, index) => {      
            let option = new Option(element.osztalyId, element.osztalyId); //new Option("option text", "value");
            $("#osztalyok").append(option);        
    });//hozzáadunk egy újabb option tag-et
    tomb.splice(0,tomb.length);
}


osztalyAdatokSzureshez(tomb) {    
    tomb.forEach((element, index) => {      
            let option = new Option(element.osztalyId, element.osztalyId); //new Option("option text", "value");
            $("#szures-osztalyra").append(option);      
    });//hozzáadunk egy újabb option tag-et
    tomb.splice(0,tomb.length);  
}

tevekenysegAdatokImport(tomb) {    
    tomb.forEach((element, index) => {      
            let option = new Option(element.nev, element.id); //new Option("option text", "value");
            $("#tevekenysegek").append(option);                     
    });//hozzáadunk egy újabb option tag-et 
    tomb.splice(0,tomb.length);  
}

kereses(){
$("#kereses").on("keyup", function() {
    let value = $(this).val().toLowerCase();
    $("table tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
}

getRendezesiAttributum(){
    $('table').on('click','th',(event)=>{  //amelyik th-ra rákattintottam, annak az id-ját kérem le
        this.esemenyInfoTovábbit('rendezesiAttributum', $(event.target).attr('id')); //a th-kban elrejtettem a tömb kulcsait; ezt kérjük le, és adjuk tovább
    });
}


esemenyInfoTovábbit(esemenyKulcs,adat) {    
    let event = new CustomEvent(esemenyKulcs, {
        detail: adat, //ezzel adatokat tudok átadni
    });
    window.dispatchEvent(event);
}


//a beszúrandó adatok kiválasztása a legördülő listákból
kivalasztBeszurandoAdat(){
    $("#kuld").on("click", () => {
        if(!($("#osztalyok").val()==='0' || $("#tevekenysegek").val()==='0')) {
        const beszurandoAdat = {
            //eltárolom a legördülő listák aktuálisan kijelölt értékeit
            osztalyId: $("#osztalyok").val(),
            tevekenysegId: $("#tevekenysegek").val(),
        };        
        this.esemenyInfoTovábbit('ujAdatBeszur',beszurandoAdat);
    }else{
        alert('Mindkét legördülő listából válassz értéket!');
    }
    });
}


}


