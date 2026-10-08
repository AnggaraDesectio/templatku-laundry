import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column } from '@/components/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Pelanggan {
    id: number;
    nama: string;
    telepon: string;
    order: number;
    totalBelanja: number;
}

const rp = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

export default function Pelanggan({ pelanggans }: { pelanggans: Record<string, any>[] }) {
    const rows: Pelanggan[] = pelanggans.map((p, i) => ({
        id: Number(p.id) || i + 1,
        nama: String(p.nama),
        telepon: String(p.telepon),
        order: Number(p.order),
        totalBelanja: Number(p.totalBelanja),
    }));

    const columns: Column<Pelanggan>[] = [
        { key: 'nama', header: 'Nama', sortValue: (r) => r.nama },
        { key: 'telepon', header: 'No. WA', sortValue: (r) => r.telepon, mobileHidden: true },
        {
            key: 'order',
            header: 'Total Order',
            render: (r) => <span className="tnum">{r.order}x</span>,
            sortValue: (r) => r.order,
        },
        {
            key: 'totalBelanja',
            header: 'Total Belanja',
            render: (r) => <span className="tnum font-medium">{rp(r.totalBelanja)}</span>,
            sortValue: (r) => r.totalBelanja,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Pelanggan"
                description="Daftar pelanggan tetap dan riwayat belanja mereka."
                breadcrumbs={[{ label: 'Laundry', href: '/laundry' }, { label: 'Pelanggan' }]}
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Daftar Pelanggan</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['nama', 'telepon']}
                        emptyTitle="Belum ada pelanggan"
                        emptyDescription="Pelanggan yang mencuci akan tercatat otomatis di sini."
                    />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
