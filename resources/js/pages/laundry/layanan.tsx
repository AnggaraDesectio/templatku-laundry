import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Tag } from 'lucide-react';

interface Layanan {
    id: number;
    nama: string;
    satuan: string;
    harga: number;
    estimasi: string;
}

const rp = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

export default function Layanan({ layanans }: { layanans: Layanan[] }) {
    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Daftar Harga"
                description="Tarif layanan Bersih Kinclong per satuan."
                breadcrumbs={[{ label: 'Laundry', href: '/laundry' }, { label: 'Layanan' }]}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {layanans.map((l) => (
                    <Card key={l.id} className="shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <span className="bg-primary/10 text-primary rounded-lg p-2">
                                    <Tag className="h-4 w-4" />
                                </span>
                                {l.nama}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="tnum text-2xl font-bold">
                                {rp(l.harga)}
                                <span className="text-muted-foreground text-sm font-normal">
                                    /{l.satuan}
                                </span>
                            </p>
                            <p className="text-muted-foreground mt-2 flex items-center gap-1.5 text-sm">
                                <Clock className="h-3.5 w-3.5" /> Estimasi selesai {l.estimasi}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
