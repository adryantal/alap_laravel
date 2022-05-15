<?php

namespace App\Http\Controllers;
use App\Models\Tevekenyseg;

use Illuminate\Http\Request;

class TevekenysegController extends Controller
{
    //összes tevékenység
    public function index()
    {
        $tevekenysegek = response()->json(Tevekenyseg::all());
        return $tevekenysegek;
    }

}
