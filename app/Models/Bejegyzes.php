<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Tevekenyseg;

class Bejegyzes extends Model
{
    use HasFactory;

//adott bejegyzéshez tart. tevékenység 
// ez a változat kell a 'with' alkalmazásánál!
//ilyenkor a kapcsolódó tevekenyseg objektumot is megkapjuk
//public function hasOne(relatedModel, relatedModelsKey, currentModelsforeignKey)
//public function hasOne(Tevekenyseg, tevekenyseg.id, bejegyzes.tevekenysegId)
public function tevekenyseg()
{
    return $this->hasOne(Tevekenyseg::class, 'id', 'tevekenysegId');
}

//adott bejegyzés szerzője
public function user()
{
    return $this->belongsTo(User::class);
}

//így null értékű lesz a tevekenyseg, ha 'with tevekenyseg'-et használok:
public function tevekenyseg2()
{
    return $this->belongsTo(Tevekenyseg::class);
}



}
