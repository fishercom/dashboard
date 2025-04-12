<?php

use App\Http\Controllers\Dashboard\LangController;
use App\Http\Controllers\Dashboard\ProfileController;
use App\Http\Controllers\Dashboard\UserController;
use App\Http\Controllers\Dashboard\LogController;

use Illuminate\Support\Facades\Route;

Route::middleware('auth')->prefix('dashboard')->group(function () {

    Route::resource('profiles', ProfileController::class);
    Route::resource('users', UserController::class);
    Route::resource('langs', LangController::class);
    Route::resource('logs', LogController::class);

});
