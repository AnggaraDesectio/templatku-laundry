import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';

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

type StatusKey = 'diterima' | 'dicuci' | 'disetrika' | 'siap';

const URUTAN: StatusKey[] = ['diterima', 'dicuci', 'disetrika', 'siap'];
const JUDUL: Record<StatusKey, string> = {
    diterima: 'Diterima',
    dicuci: 'Dicuci',
    disetrika: 'Disetrika',
    siap: 'Siap Diambil',
};
const TONE: Record<StatusKey, ToneLabel> = {
    diterima: { label: 'Diterima', tone: 'info' },
    dicuci: { label: 'Dicuci', tone: 'warning' },
    disetrika: { label: 'Disetrika', tone: 'warning' },
    siap: { label: 'Siap Diambil', tone: 'success' },
};

const rp = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

export default function OrderBoard({ orders }: { orders: Order[] }) {
    const [statusMap, setStatusMap] = useState<Record<number, StatusKey>>({});
    const semua = orders.map((o) => ({
        ...o,
        statusKey: (statusMap[o.id] ?? o.statusKey) as StatusKey,
    }));

    const majukan = (o: Order & { statusKey: StatusKey }) => {
        const i = URUTAN.indexOf(o.statusKey);
        if (i < 0 || i >= URUTAN.length - 1) return;
        setStatusMap((prev) => ({ ...prev, [o.id]: URUTAN[i + 1] }));
    };

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Papan Order"
                description="Status cucian hari ini, majukan tahap tiap order yang sudah selesai diproses."
                breadcrumbs={[{ label: 'Laundry', href: '/laundry' }, { label: 'Order' }]}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {URUTAN.map((st) => {
                    const isi = semua.filter((o) => o.statusKey === st);
                    const terakhir = st === 'siap';
                    return (
                        <Card key={st} className="shadow-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center justify-between text-sm">
                                    {JUDUL[st]}
                                    <span className="tnum bg-muted rounded-full px-2 py-0.5 text-xs">
                                        {isi.length}
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2.5">
                                {isi.length === 0 && (
                                    <p className="text-muted-foreground py-4 text-center text-xs">Kosong</p>
                                )}
                                {isi.map((o) => (
                                    <div key={o.id} className="rounded-lg border p-3">
                                        <p className="font-mono text-xs font-semibold">{o.nota}</p>
                                        <p className="mt-0.5 truncate text-sm font-medium">{o.pelanggan}</p>
                                        <p className="tnum text-muted-foreground text-xs">
                                            {o.layanan} · {String(o.berat).replace('.', ',')} {o.satuan}
                                        </p>
                                        <p className="tnum mt-1 text-sm font-bold">{rp(o.total)}</p>
                                        {!terakhir ? (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="mt-2 w-full gap-1.5"
                                                onClick={() => majukan(o)}
                                            >
                                                <ArrowRight className="h-3.5 w-3.5" />
                                                ke {JUDUL[URUTAN[URUTAN.indexOf(st) + 1]]}
                                            </Button>
                                        ) : (
                                            <p className="text-success mt-2 inline-flex items-center gap-1 text-xs font-medium">
                                                <Check className="h-3.5 w-3.5" /> Menunggu diambil
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-xs">
                {URUTAN.map((st) => (
                    <span key={st} className="inline-flex items-center gap-1.5">
                        <ToneBadge label={TONE[st].label} tone={TONE[st].tone} />
                    </span>
                ))}
                <span className={cn('text-muted-foreground')}>, perubahan status bersifat sementara di halaman ini.</span>
            </div>
        </AuthenticatedLayout>
    );
}
