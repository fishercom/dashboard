<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::group(['namespace'=>'App\Http\Controllers\App'], function(){

    Route::middleware('auth:cliente')->post('/logout', 'AuthController@logout');
    Route::middleware('auth:cliente')->post('/cliente', 'AuthController@cliente');

    Route::get('/article/home',['uses' => 'ArticleController@home']);
    Route::get('/article/pages',['uses' => 'ArticleController@pages']);
    Route::get('/article/header',['uses' => 'ArticleController@header']);
    Route::get('/article/footer',['uses' => 'ArticleController@footer']);
    Route::get('/article/page',['uses' => 'ArticleController@page']);

    Route::get('/parameters',['uses' => 'ParameterController@list']);
    Route::get('/parameter/{id}',['uses' => 'ParameterController@info']);

    Route::post('/ubigeo/departments',['uses' => 'UbigeoController@department_list']);
    Route::post('/ubigeo/provinces',['uses' => 'UbigeoController@province_list']);
    Route::post('/ubigeo/districts',['uses' => 'UbigeoController@district_list']);

    //Route::post('/ubigeo/save_cookie',['uses' => 'UbigeoController@save_cookie']);

    Route::get('/cliente/persona',['uses' => 'ClienteController@persona']);
    Route::post('/cliente/store',['uses' => 'ClienteController@store']);
    Route::post('/cliente/update',['uses' => 'ClienteController@update']);

    Route::get('/documento/list',['uses' => 'DocumentoController@list']);
    Route::post('/documento/store',['uses' => 'DocumentoController@store']);

});
