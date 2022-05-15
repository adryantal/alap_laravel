<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    
    public function osztalyok(){

        $osztalyok = response()->json(DB::table('users')
        ->select('osztalyId')
        ->distinct()->get()
        );

        return $osztalyok;

    }
}
