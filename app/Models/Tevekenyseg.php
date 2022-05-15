<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tevekenyseg extends Model
{
    use HasFactory;

      //adott tevékenységhez tart. bejegyzések
      public function bejegyzesek()
      {
          return $this->hasMany(Bejegyzes::class);
      }
}
