<?php

use App\Http\Controllers\Web\LaundryController;
use Illuminate\Support\Facades\Route;

/** Flavor LAUNDRY (didaftarkan oleh worker routes/web.php). */
Route::prefix('laundry')->name('laundry.')->group(function () {
    Route::get('/', [LaundryController::class, 'index'])->name('index');
    Route::get('/order', [LaundryController::class, 'order'])->name('order');
    Route::get('/pelanggan', [LaundryController::class, 'pelanggan'])->name('pelanggan');
    Route::get('/layanan', [LaundryController::class, 'layanan'])->name('layanan');
    Route::get('/laporan', [LaundryController::class, 'laporan'])->name('laporan');
});
