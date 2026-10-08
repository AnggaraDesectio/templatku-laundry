import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { BarChartCard, type ChartData } from '@/components/charts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Shirt, Sparkles, Timer, Users } from 'lucide-react';
import { toast } from 'sonner';

interface Ringkasan {
    orderHariIni: number;
    dalamProses: number;
    siapDiambil: number;
    omzetHariIni: number;
    totalOrder: number;
    totalPelanggan: number;
}

const rp = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

function exportCsv(ringkasan: Ringkasan) {
    const header = 'Metrik,Nilai';
    const lines = [
        ['Order hari ini', ringkasan.orderHariIni],
        ['Dalam proses', ringkasan.dalamProses],
        ['Siap diambil', ringkasan.siapDiambil],
        ['Omzet hari ini', `Rp ${ringkasan.omzetHariIni}`],
        ['Total order', ringkasan.totalOrder],
        ['Total pelanggan', ringkasan.totalPelanggan],
    ].map(([k, v]) => `"${k}","${v}"`);
    const blob = new Blob([[header, ...lines].join('\n')], {
        type: 'text/csv;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'laporan-laundry.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Laporan berhasil diunduh');
}

export default function Laporan({
    ringkasan,
    perLayanan,
}: {
    ringkasan: Ringkasan;
    perLayanan: ChartData;
}) {
    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Laporan Laundry"
                description="Rekap operasional Bersih Kinclong, 8 Oktober 2026."
                breadcrumbs={[{ label: 'Laundry', href: '/laundry' }, { label: 'Laporan' }]}
                actions={
                    <Button variant="outline" size="sm" onClick={() => exportCsv(ringkasan)}>
                        <Download className="mr-2 h-4 w-4" /> Export CSV
                    </Button>
                }
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Order Hari Ini" value={String(ringkasan.orderHariIni)} delta="pesanan masuk" trend="up" icon={Shirt} hint="Nota cucian yang dibuat hari ini." />
                <StatCard label="Dalam Proses" value={String(ringkasan.dalamProses)} delta="belum diambil" trend="flat" icon={Timer} hint="Cucian yang sedang dicuci atau disetrika." />
                <StatCard label="Omzet Hari Ini" value={rp(ringkasan.omzetHariIni)} delta="semua order hari ini" trend="up" icon={Sparkles} hint="Uang masuk dari pembayaran order hari ini." />
                <StatCard label="Total Pelanggan" value={String(ringkasan.totalPelanggan)} delta="pelanggan terdaftar" trend="up" icon={Users} hint="Pelanggan yang pernah mencuci di sini." />
            </div>
            <Card className="mt-4 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Order per Layanan</CardTitle>
                    <p className="text-muted-foreground text-sm">
                        Layanan apa yang paling sering dipesan.
                    </p>
                </CardHeader>
                <CardContent>
                    <BarChartCard data={perLayanan} />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
