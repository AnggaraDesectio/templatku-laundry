import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { PrintArea, ThermalReceipt } from '@/components/print-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Printer, Shirt, Sparkles, Timer, WashingMachine } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

interface Ringkasan {
    orderHariIni: number;
    dalamProses: number;
    siapDiambil: number;
    omzetHariIni: number;
    totalOrder: number;
    totalPelanggan: number;
}

interface Layanan {
    id: number;
    nama: string;
    satuan: string;
    harga: number;
    estimasi: string;
}

interface Order {
    id: number;
    nota: string;
    pelanggan: string;
    layanan: string;
    berat: number;
    satuan: string;
    total: number;
    statusKey: string;
    tanggal: string;
    status: ToneLabel;
}

const HARI_INI = '2026-10-08';
const rp = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;
const parseAngka = (s: string) => {
    const v = parseFloat(s.replace(',', '.'));
    return Number.isFinite(v) && v > 0 ? v : 0;
};

export default function LaundryIndex({
    ringkasan,
    orders,
    layanans,
}: {
    ringkasan: Ringkasan;
    orders: Order[];
    layanans: Layanan[];
}) {
    const [baru, setBaru] = useState<Order[]>([]);
    const semua = [...baru, ...orders];
    const orderHariIni = semua.filter((o) => o.tanggal === HARI_INI);

    // --- Kasir cepat ---
    const [nama, setNama] = useState('');
    const [layananId, setLayananId] = useState<string>(String(layanans[0]?.id ?? ''));
    const [jumlahInput, setJumlahInput] = useState('');

    const layanan = layanans.find((l) => String(l.id) === layananId) ?? layanans[0];
    const jumlah = parseAngka(jumlahInput);
    const totalKasir = Math.round(jumlah * (layanan?.harga ?? 0));

    const omzet = useMemo(
        () => orderHariIni.reduce((s, o) => s + o.total, 0),
        [orderHariIni],
    );

    const [notaAktif, setNotaAktif] = useState<string>('');
    const orderAktif = semua.find((o) => o.nota === notaAktif);

    const buatOrder = () => {
        if (!nama.trim() || jumlah <= 0 || !layanan) {
            toast.error('Isi nama pelanggan, layanan, dan jumlah dulu');
            return;
        }
        const noUrut = semua.length + 1;
        const nota = `BK-2026-10-${String(noUrut).padStart(3, '0')}`;
        setBaru((prev) => [
            {
                id: Date.now(),
                nota,
                pelanggan: nama.trim(),
                layanan: layanan.nama,
                berat: Math.round(jumlah * 100) / 100,
                satuan: layanan.satuan,
                total: totalKasir,
                statusKey: 'diterima',
                tanggal: HARI_INI,
                status: { label: 'Diterima', tone: 'info' } as ToneLabel,
            },
            ...prev,
        ]);
        setNotaAktif(nota);
        setNama('');
        setJumlahInput('');
        toast.success(`Order ${nota} dibuat, ${rp(totalKasir)}`);
    };

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Kasir Laundry"
                description="Terima cucian baru dan pantau order sampai diambil pelanggan."
                breadcrumbs={[{ label: 'Laundry' }]}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Order Hari Ini" value={String(orderHariIni.length)} delta="pesanan masuk" trend="up" icon={WashingMachine} hint="Nota cucian yang dibuat hari ini." />
                <StatCard label="Dalam Proses" value={String(ringkasan.dalamProses)} delta="diterima → disetrika" trend="flat" icon={Timer} hint="Cucian yang sedang dicuci atau disetrika." />
                <StatCard label="Siap Diambil" value={String(ringkasan.siapDiambil)} delta="menunggu pelanggan" trend="flat" icon={Shirt} hint="Cucian bersih yang belum diambil pelanggan." />
                <StatCard label="Omzet Hari Ini" value={rp(omzet)} delta={`dari ${orderHariIni.length} order`} trend="up" icon={Sparkles} hint="Uang masuk dari pembayaran order hari ini." />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Kasir Cepat</CardTitle>
                        <p className="text-muted-foreground text-sm">
                            Jumlah boleh pakai koma, misal 2,5.
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="nama">Nama pelanggan</Label>
                            <Input id="nama" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="cth. Siti Aminah" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1.5">
                                <Label>Layanan</Label>
                                <Select value={layananId} onValueChange={setLayananId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih layanan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {layanans.map((l) => (
                                            <SelectItem key={l.id} value={String(l.id)}>
                                                {l.nama}, {rp(l.harga)}/{l.satuan}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="jumlah">Jumlah ({layanan?.satuan})</Label>
                                <Input id="jumlah" value={jumlahInput} onChange={(e) => setJumlahInput(e.target.value)} placeholder="cth. 2,5" inputMode="decimal" />
                            </div>
                        </div>
                        <div className="flex items-baseline justify-between rounded-lg bg-muted/60 px-3 py-2.5">
                            <span className="text-sm font-medium">Total bayar</span>
                            <span className="tnum text-xl font-bold">{rp(totalKasir)}</span>
                        </div>
                        <Button className="w-full gap-2" onClick={buatOrder}>
                            <Plus className="h-4 w-4" /> Buat Order
                        </Button>
                    </CardContent>
                </Card>
                <Card className="shadow-sm xl:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-base">Order Hari Ini</CardTitle>
                        <p className="text-muted-foreground text-sm">
                            Klik nota untuk mencetak struk.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            <ul className="max-h-80 space-y-1.5 overflow-y-auto pr-1">
                                {orderHariIni.map((o) => (
                                    <li key={o.nota}>
                                        <button
                                            type="button"
                                            onClick={() => setNotaAktif(o.nota)}
                                            className={`flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors ${o.nota === notaAktif ? 'border-primary bg-primary/5' : 'hover:bg-muted/60'}`}
                                        >
                                            <span>
                                                <span className="font-mono text-xs font-semibold">{o.nota}</span>
                                                <span className="text-muted-foreground block text-xs">
                                                    {o.pelanggan} · {o.layanan} · {String(o.berat).replace('.', ',')} {o.satuan}
                                                </span>
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <span className="tnum text-sm font-bold">{rp(o.total)}</span>
                                                <ToneBadge label={o.status.label} tone={o.status.tone} />
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <PrintArea>
                                <div className="rounded-lg border bg-white p-4 text-black">
                                    {orderAktif ? (
                                        <>
                                            <ThermalReceipt
                                                storeName="BERSIH KINCLONG"
                                                storeAddress="Jl. Bangka Raya No. 12, Jakarta Selatan"
                                                items={[
                                                    {
                                                        name: `${orderAktif.layanan} (${String(orderAktif.berat).replace('.', ',')} ${orderAktif.satuan})`,
                                                        qty: 1,
                                                        price: orderAktif.total,
                                                    },
                                                ]}
                                                paid={orderAktif.total}
                                                footerNote={`Nota ${orderAktif.nota} · ${orderAktif.pelanggan}. Terima kasih!`}
                                            />
                                            <Button variant="outline" size="sm" className="no-print mt-3 w-full gap-2" onClick={() => window.print()}>
                                                <Printer className="h-4 w-4" /> Cetak Struk
                                            </Button>
                                        </>
                                    ) : (
                                        <p className="text-sm text-black/60">Pilih order untuk melihat struk.</p>
                                    )}
                                </div>
                            </PrintArea>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
