<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CoffeeMenuController;
use App\Http\Controllers\OrderController;

// Public route
Route::post('/login', [AuthController::class, 'login']);






// Protected routes (require JWT token)
Route::middleware('auth:api')->group(function () {
        // Profile
   Route::get('/profile', [AuthController::class, 'profile']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);

    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{id}', [CategoryController::class, 'show']);
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

    Route::get('/coffee-menu', [CoffeeMenuController::class, 'index']);
    Route::get('/coffee-menu/{id}', [CoffeeMenuController::class, 'show']);
    Route::post('/coffee-menu', [CoffeeMenuController::class, 'store']);
    Route::put('/coffee-menu/{id}', [CoffeeMenuController::class, 'update']);
    Route::delete('/coffee-menu/{id}', [CoffeeMenuController::class, 'destroy']);

    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::put('/orders/{id}', [OrderController::class, 'update']);
    Route::delete('/orders/{id}', [OrderController::class, 'destroy']);

});
