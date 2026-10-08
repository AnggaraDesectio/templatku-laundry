<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Support\Demo\LaundryData;
use Inertia\Inertia;
use Inertia\Response;

/** Flavor LAUNDRY "Bersih Kinclong": kasir, order, pelanggan, layanan, laporan. */
class LaundryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('laundry/index', [
            'ringkasan' => LaundryData::ringkasan(),
            'orders'    => LaundryData::orders(),
            'layanans'  => LaundryData::layanans(),
        ]);
    }

    public function order(): Response
    {
        return Inertia::render('laundry/order', [
            'orders'   => LaundryData::orders(),
            'layanans' => LaundryData::layanans(),
        ]);
    }

    public function pelanggan(): Response
    {
        return Inertia::render('laundry/pelanggan', [
            'pelanggans' => LaundryData::pelanggans(),
        ]);
    }

    public function layanan(): Response
    {
        return Inertia::render('laundry/layanan', [
            'layanans' => LaundryData::layanans(),
        ]);
    }

    public function laporan(): Response
    {
        return Inertia::render('laundry/laporan', [
            'ringkasan' => LaundryData::ringkasan(),
            'perLayanan' => LaundryData::orderPerLayanan(),
            'orders'    => LaundryData::orders(),
        ]);
    }
}
