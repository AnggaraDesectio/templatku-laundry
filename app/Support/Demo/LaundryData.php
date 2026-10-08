<?php

namespace App\Support\Demo;

/**
 * Data demo flavor LAUNDRY "Bersih Kinclong" (Jakarta Selatan):
 * layanan, order, pelanggan, ringkasan.
 * Kontrak: status berbentuk ['label' => .., 'tone' => ..]
 * (tanpa HTML), tone: success | warning | destructive | info.
 * Total order = berat x tarif (+ tambahan) ditulis eksplisit supaya konsisten.
 */
class LaundryData
{
    public static function layanans(): array
    {
        return [
            ['id' => 1, 'nama' => 'Cuci Kering Reguler', 'satuan' => 'kg',    'harga' => 8000,  'estimasi' => '2 hari'],
            ['id' => 2, 'nama' => 'Cuci Express',        'satuan' => 'kg',    'harga' => 12000, 'estimasi' => '6 jam'],
            ['id' => 3, 'nama' => 'Cuci + Setrika',      'satuan' => 'kg',    'harga' => 10000, 'estimasi' => '2 hari'],
            ['id' => 4, 'nama' => 'Setrika Saja',        'satuan' => 'kg',    'harga' => 6000,  'estimasi' => '1 hari'],
            ['id' => 5, 'nama' => 'Cuci Sepatu',         'satuan' => 'pasang','harga' => 25000, 'estimasi' => '3 hari'],
            ['id' => 6, 'nama' => 'Cuci Boneka',         'satuan' => 'pcs',   'harga' => 30000, 'estimasi' => '3 hari'],
        ];
    }

    public static function orders(): array
    {
        return [
            ['id' =>  1, 'nota' => 'BK-2026-10-001', 'pelanggan' => 'Siti Aminah',   'layanan' => 'Cuci Kering Reguler', 'berat' => 2.5, 'satuan' => 'kg',    'total' => 20000, 'statusKey' => 'diterima', 'tanggal' => '2026-10-08', 'status' => ['label' => 'Diterima',  'tone' => 'info']],
            ['id' =>  2, 'nota' => 'BK-2026-10-002', 'pelanggan' => 'Budi Santoso',  'layanan' => 'Cuci Express',        'berat' => 3.0, 'satuan' => 'kg',    'total' => 36000, 'statusKey' => 'dicuci',   'tanggal' => '2026-10-08', 'status' => ['label' => 'Dicuci',    'tone' => 'warning']],
            ['id' =>  3, 'nota' => 'BK-2026-10-003', 'pelanggan' => 'Dewi Lestari',  'layanan' => 'Cuci + Setrika',      'berat' => 4.2, 'satuan' => 'kg',    'total' => 42000, 'statusKey' => 'disetrika','tanggal' => '2026-10-08', 'status' => ['label' => 'Disetrika', 'tone' => 'warning']],
            ['id' =>  4, 'nota' => 'BK-2026-10-004', 'pelanggan' => 'Agus Wijaya',   'layanan' => 'Cuci Express',        'berat' => 1.8, 'satuan' => 'kg',    'total' => 21600, 'statusKey' => 'siap',     'tanggal' => '2026-10-08', 'status' => ['label' => 'Siap Diambil', 'tone' => 'success']],
            ['id' =>  5, 'nota' => 'BK-2026-10-005', 'pelanggan' => 'Rina Marlina',  'layanan' => 'Setrika Saja',        'berat' => 5.0, 'satuan' => 'kg',    'total' => 30000, 'statusKey' => 'diterima', 'tanggal' => '2026-10-08', 'status' => ['label' => 'Diterima',  'tone' => 'info']],
            ['id' =>  6, 'nota' => 'BK-2026-10-006', 'pelanggan' => 'Joko Prasetyo', 'layanan' => 'Cuci Kering Reguler', 'berat' => 2.0, 'satuan' => 'kg',    'total' => 16000, 'statusKey' => 'disetrika','tanggal' => '2026-10-07', 'status' => ['label' => 'Disetrika', 'tone' => 'warning']],
            ['id' =>  7, 'nota' => 'BK-2026-10-007', 'pelanggan' => 'Maya Putri',    'layanan' => 'Cuci Sepatu',         'berat' => 2.0, 'satuan' => 'pasang','total' => 50000, 'statusKey' => 'siap',     'tanggal' => '2026-10-07', 'status' => ['label' => 'Siap Diambil', 'tone' => 'success']],
            ['id' =>  8, 'nota' => 'BK-2026-10-008', 'pelanggan' => 'Hendra Gunawan','layanan' => 'Cuci Kering Reguler', 'berat' => 3.5, 'satuan' => 'kg',    'total' => 28000, 'statusKey' => 'dicuci',   'tanggal' => '2026-10-08', 'status' => ['label' => 'Dicuci',    'tone' => 'warning']],
            ['id' =>  9, 'nota' => 'BK-2026-10-009', 'pelanggan' => 'Fitri Rahayu',  'layanan' => 'Cuci Boneka',         'berat' => 1.0, 'satuan' => 'pcs',   'total' => 30000, 'statusKey' => 'dicuci',   'tanggal' => '2026-10-08', 'status' => ['label' => 'Dicuci',    'tone' => 'warning']],
            ['id' => 10, 'nota' => 'BK-2026-10-010', 'pelanggan' => 'Dedi Kurniawan','layanan' => 'Cuci + Setrika',      'berat' => 2.6, 'satuan' => 'kg',    'total' => 26000, 'statusKey' => 'diterima', 'tanggal' => '2026-10-08', 'status' => ['label' => 'Diterima',  'tone' => 'info']],
        ];
    }

    public static function pelanggans(): array
    {
        return [
            ['id' => 1, 'nama' => 'Siti Aminah',    'telepon' => '081234567890', 'order' => 14, 'totalBelanja' => 486000],
            ['id' => 2, 'nama' => 'Budi Santoso',   'telepon' => '081298765432', 'order' => 9,  'totalBelanja' => 312000],
            ['id' => 3, 'nama' => 'Dewi Lestari',   'telepon' => '081322334455', 'order' => 11, 'totalBelanja' => 398000],
            ['id' => 4, 'nama' => 'Agus Wijaya',    'telepon' => '081355667788', 'order' => 6,  'totalBelanja' => 214000],
            ['id' => 5, 'nama' => 'Rina Marlina',   'telepon' => '081377889900', 'order' => 8,  'totalBelanja' => 276000],
            ['id' => 6, 'nama' => 'Joko Prasetyo',  'telepon' => '081344556677', 'order' => 5,  'totalBelanja' => 168000],
            ['id' => 7, 'nama' => 'Maya Putri',     'telepon' => '081366778899', 'order' => 7,  'totalBelanja' => 342000],
            ['id' => 8, 'nama' => 'Hendra Gunawan', 'telepon' => '081388990011', 'order' => 4,  'totalBelanja' => 145000],
        ];
    }

    public static function ringkasan(): array
    {
        $orders = self::orders();
        $hariIni = '2026-10-08';
        $orderHariIni = array_filter($orders, fn ($o) => $o['tanggal'] === $hariIni);

        return [
            'orderHariIni' => count($orderHariIni), // 8
            'dalamProses'  => count(array_filter($orders, fn ($o) => $o['statusKey'] !== 'siap')), // 8
            'siapDiambil'  => count(array_filter($orders, fn ($o) => $o['statusKey'] === 'siap')), // 2
            'omzetHariIni' => array_sum(array_map(fn ($o) => $o['total'], $orderHariIni)), // 233.600
            'totalOrder'   => count($orders), // 10
            'totalPelanggan' => count(self::pelanggans()), // 8
        ];
    }

    /** Order per layanan untuk grafik laporan. */
    public static function orderPerLayanan(): array
    {
        $map = [];
        foreach (self::orders() as $o) {
            $map[$o['layanan']] = ($map[$o['layanan']] ?? 0) + 1;
        }
        return [
            'labels'   => array_keys($map),
            'datasets' => [['label' => 'Order', 'data' => array_values($map)]],
        ];
    }
}
