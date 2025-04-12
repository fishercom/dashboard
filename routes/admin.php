<?php

use App\Http\Controllers\Admin\LangController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\LogController;
use App\Http\Controllers\Admin\TranslateController;
use App\Http\Controllers\Admin\ConfigController;
use App\Http\Controllers\Admin\SiteController;

use Illuminate\Support\Facades\Route;

Route::middleware('auth')->prefix('admin')->group(function () {

    Route::resource('profiles', ProfileController::class);
    Route::resource('users', UserController::class);
    Route::resource('langs', LangController::class);
    Route::resource('logs', LogController::class);
    Route::resource('translates', TranslateController::class);
    Route::resource('configs', ConfigController::class);
    Route::resource('sites', SiteController::class);

});
