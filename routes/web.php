<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BejegyzesController;
use App\Http\Controllers\TevekenysegController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

// Route::get('/dashboard', function () {
//     return view('dashboard');
// })->middleware(['auth'])->name('dashboard');

require __DIR__.'/auth.php';

Route::get('/index', function () { return view('kizolditjukafoldet.index');}); //login oldal
Route::get('/admin', function () { return view('kizolditjukafoldet.admin');}); //admin oldal

/* Bejegyzések */
Route::get('/bejegyzes/osszes', [BejegyzesController::class, 'index']); //összes bejegyzés kilistázása a tevekenyseg objektumokkal összekapcsolva
Route::get('/bejegyzesek/{osztalyId}', [BejegyzesController::class, 'osztalyBejegyzesei']); //adott osztály által beszúrt bejegyzések
Route::post('/bejegyzes/beszur', [BejegyzesController::class, 'store']); //új bejegyzés beszúrása

/* Tevekenységek */
Route::get('/tevekenyseg/osszes', [TevekenysegController::class, 'index']);

Route::get('/osztalyok', [UserController::class, 'osztalyok']); //osztályId-k lekérése a dropdown-ba történő betöltéshez

/* Diagramhoz */
Route::get('/statisztika', [BejegyzesController::class, 'statisztika']);

/*Plussz*/
//bejegyzés módosítása
//bejegyzés törlése