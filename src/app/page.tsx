import { Header } from '@/components/common/Header';
import { PageWrapper } from '@/components/common/PageWrapper';
import { DistrictSelector } from '@/components/home/DistrictSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Spade, Users } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Header />
      <PageWrapper>
        <main className="flex-grow flex flex-col items-center justify-center text-center py-12">
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Our Voice, Our Rights
          </h1>
          <p className="max-w-3xl text-lg md:text-xl text-muted-foreground mb-12">
            Understand how the MGNREGA program is performing in your area.
            Simple, clear, and for everyone.
          </p>

          <DistrictSelector />

          <section className="w-full max-w-5xl mt-24 text-left">
            <h2 className="font-headline text-3xl font-bold text-center mb-8">What is MGNREGA?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader className="flex-row items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <Users className="w-6 h-6" />
                  </div>
                  <CardTitle className="font-headline text-xl">Guaranteed Work</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Provides at least 100 days of wage employment in a financial year to every rural household whose adult members volunteer to do unskilled manual work.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex-row items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <Spade className="w-6 h-6" />
                  </div>
                  <CardTitle className="font-headline text-xl">Rural Livelihoods</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Aims to enhance livelihood security by creating durable assets, such as roads, canals, and ponds in rural areas.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex-row items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <Building className="w-6 h-6" />
                  </div>
                  <CardTitle className="font-headline text-xl">Empowering People</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Strengthens local governance through Gram Panchayats and empowers vulnerable groups, especially women, Scheduled Castes, and Scheduled Tribes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
      </PageWrapper>
    </>
  );
}
