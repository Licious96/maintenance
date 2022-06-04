<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Controller;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/register', [Controller::class, 'register']);
Route::post('/otp', [Controller::class, 'otp']);
Route::post('/login', [Controller::class, 'login']);
Route::post('/staffLogin', [Controller::class, 'staffLogin']);
Route::get('/getUser/{id}', [Controller::class, 'getUser']);
Route::get('/getAdmin/{id}', [Controller::class, 'getAdmin']);
Route::post('/forgotPassword/{email}', [Controller::class, 'forgotPassword']);
Route::post('/query', [Controller::class, 'query']);
Route::get('/getQueries/{id}', [Controller::class, 'getQueries']);
Route::get('/getAllQueries', [Controller::class, 'getAllQueries']);
Route::post('/updateStatus/{id}/{status}', [Controller::class, 'updateStatus']);
Route::post('/remove/{id}', [Controller::class, 'remove']);
Route::post('/updatePassword/{id}', [Controller::class, 'updatePassword']);
Route::post('/updateEmail/{id}', [Controller::class, 'updateEmail']);
Route::post('/uploadPicture', [Controller::class, 'uploadPicture']);
Route::post('/recordQuery', [Controller::class, 'recordQuery']);
Route::get('/getRecords', [Controller::class, 'getRecords']);
Route::get('/getSum', [Controller::class, 'getSum']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
