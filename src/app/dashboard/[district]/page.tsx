import { notFound } from 'next/navigation';
import { getDataForDistrict } from '@/lib/mgnrega-data';
import { Header } from '@/components/common/Header';
import { PageWrapper } from '@/components/common/PageWrapper';
import EmploymentChart from '@/components/dashboard/EmploymentChart';
import FundsChart from '@/components/dashboard/FundsChart';
import WorksChart from '@/components/dashboard/WorksChart';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import DataCard from '@/components/dashboard/DataCard';

export const dynamic = 'force-dynamic';

export default async function DistrictDashboard({
  params,
}: {
  params: { district: string };
}) {
  const districtName = decodeURIComponent(params.district);
  const stateName = 'Bihar'; // Hardcoded for this project
  const districtData = getDataForDistrict(stateName, districtName);

  if (!districtData) {
    notFound();
  }
  
  const totalPersonDays = districtData.reduce((acc, month) => acc + month.personDaysGenerated, 0);
  const totalFundsUtilised = districtData.reduce((acc, month) => acc + month.fundsUtilised, 0);
  const totalWorksCompleted = districtData.reduce((acc, month) => acc + month.worksCompleted.total, 0);

  return (
    <>
      <Header />
      <PageWrapper className="py-8">
        <div className="flex justify-between items-start mb-6">
            <div>
                <p className="text-muted-foreground">{stateName}</p>
                <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
                    {districtName} Dashboard
                </h1>
            </div>
            <Button asChild variant="outline">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Change District
                </Link>
            </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <DataCard title="Total Employment Generated" value={`${(totalPersonDays / 100000).toFixed(2)} Lakh Person-Days`} />
            <DataCard title="Total Funds Utilised" value={`₹${(totalFundsUtilised / 10000000).toFixed(2)} Cr`} />
            <DataCard title="Total Works Completed" value={totalWorksCompleted.toLocaleString('en-IN')} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EmploymentChart data={districtData} />
            <FundsChart data={districtData} />
            <div className="lg:col-span-2">
                <WorksChart data={districtData} />
            </div>
        </div>
      </PageWrapper>
    </>
  );
}
