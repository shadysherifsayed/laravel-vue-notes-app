<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->group(function() {
    Route::resource('notes', 'NoteController')->except('create', 'edit');
    Route::post('/logout', 'AuthController@logout');
    Route::get('/getLoggedUser', 'AuthController@getLoggedUser');
});

Route::post('/login', 'AuthController@login');
Route::post('/register', 'AuthController@register');
