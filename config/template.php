<?php

// Di-generate oleh php artisan template:zip - hanya berisi flavor "laundry".
// Ganti brand/warna di bawah, atau set TEMPLATE_FLAVOR di .env.

return [
    'flavor' => env('TEMPLATE_FLAVOR', 'laundry'),

    'flavors' => array (
  'laundry' => 
  array (
    'label' => 'Laundry',
    'brand_name' => 'Laundry',
    'brand_tagline' => 'Kasir & order laundry',
    'brand_initials' => 'LN',
    'accent' => '#57534e',
    'category' => 'jasa',
    'home' => 'laundry.index',
    'nav' => 
    array (
      'sections' => 
      array (
        0 => 
        array (
          'label' => 'Laundry',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Dashboard',
              'to' => '/laundry',
              'icon' => 'LayoutDashboard',
            ),
            1 => 
            array (
              'label' => 'Order',
              'to' => '/laundry/order',
              'icon' => 'WashingMachine',
            ),
            2 => 
            array (
              'label' => 'Pelanggan',
              'to' => '/laundry/pelanggan',
              'icon' => 'Users',
            ),
            3 => 
            array (
              'label' => 'Layanan',
              'to' => '/laundry/layanan',
              'icon' => 'Shirt',
            ),
            4 => 
            array (
              'label' => 'Laporan',
              'to' => '/laundry/laporan',
              'icon' => 'ChartLine',
            ),
          ),
        ),
        1 => 
        array (
          'label' => 'Umum',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Pengguna',
              'to' => '/users',
              'icon' => 'Users',
            ),
            1 => 
            array (
              'label' => 'Peran',
              'to' => '/roles',
              'icon' => 'ShieldCheck',
            ),
            2 => 
            array (
              'label' => 'Pengaturan',
              'to' => '/settings',
              'icon' => 'Settings',
            ),
            3 => 
            array (
              'label' => 'Profil',
              'to' => '/profile',
              'icon' => 'User',
            ),
          ),
        ),
      ),
    ),
  ),
),
];
