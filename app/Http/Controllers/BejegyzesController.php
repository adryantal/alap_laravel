<?php

namespace App\Http\Controllers;
use App\Models\Bejegyzes;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

class BejegyzesController extends Controller
{
    //összes bejegyzés a tevékenység objektumokkal összekapcsolva
    public function index()
    {
        $bejegyzesek = response()->json(Bejegyzes::with('tevekenyseg')->get());
        return $bejegyzesek;
    }

   //adott osztály által beszúrt bejegyzések listája
    public function osztalyBejegyzesei($osztalyId)    {
        $bejegyzesek = Bejegyzes::with('tevekenyseg')->where('osztalyId', $osztalyId)->get();     
        //azon bejegyzések listája (összekapcs. a Tevekenyseg táblával), ahol az osztalyID a bemenő osztály id-val egyezik meg 

        return $bejegyzesek;
    }

   //új bejegyzés beszúrása
    public function store(Request $request)
    {       
        $bejegyzes = new Bejegyzes();
        $bejegyzes->allapot = 0; //default: jóváhagyásra vár
        $bejegyzes->tevekenysegId = $request->tevekenysegId;
        $bejegyzes->osztalyId = $request->osztalyId;
        $bejegyzes->save();
        return Bejegyzes::find($bejegyzes->id);
    }

    //összpontszám lekérdezése osztályonként
    public function statisztika() {        
        $osszPontszamOsztalyonkent = response()->json(DB::table('bejegyzes AS b') //query buildert indítok
        ->join('tevekenysegs AS t','b.tevekenysegId','t.id') //összekapcsolom a tevekenysegs táblával
        ->select('osztalyId', DB::raw('SUM(t.pontszam) as osszpontszam'))->groupBy(DB::raw("osztalyId")) //pontszám szummázása osztályonként
        ->get()
        );
        return $osszPontszamOsztalyonkent;
      
    }

  

}
