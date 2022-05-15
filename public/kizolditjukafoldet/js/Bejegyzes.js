
//bejegyzés megjelenítése, adatok a megfelelő selectorokba történő betöltése
class BejegyzesElem {
    constructor(adat) {     
        this.adat = adat; //adat: egy bejegyzésrekord
        this.kontener = $('#bejegyzes-lista');   
        const allapot = adat.allapot===0 ? 'jóváhagyásra vár' : 'elfogadva';    
        const elem =
            "<tr class='bejegyzes'> <td><div class='osztalyinfo'>" +  adat.osztalyId +
                "</div><div class='pontinfo'> Pontérték: " + adat.tevekenyseg.pontszam +
                "</div></td><td><div class='tevekenyseginfo'>" +
                adat.tevekenyseg.nev +"</div> <div class='allapotinfo'>" + allapot +  "</div></td> <td class='pont'>" +
                      adat.tevekenyseg.pontszam +
                      "</td><td class='allapot'> " +  allapot +  "</td></tr>";

        this.kontener.append(elem);
        this.utolsoElem = this.kontener.children(".bejegyzes:last-child");
    }
}

// a bejegyzéslista felépítése tömbadatok alapján
class BejegyzesLista {
    constructor() {}
    bejegyzesListFelepit(tomb) {
        tomb.forEach((elem) => {
            new BejegyzesElem(elem);
        });
    }
}