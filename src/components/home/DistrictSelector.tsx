'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getDistrictsForState, mgnregaData } from '@/lib/mgnrega-data';
import { ChevronRight } from 'lucide-react';

const SELECTED_DISTRICT_KEY = 'mgnrega_selected_district';
const SELECTED_STATE_KEY = 'mgnrega_selected_state';

export function DistrictSelector() {
  const router = useRouter();
  const [selectedState, setSelectedState] = useState<string>('Bihar');
  const [districts, setDistricts] = useState<string[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [lastVisited, setLastVisited] = useState<{ state: string, district: string } | null>(null);

  useEffect(() => {
    // Load last visited district from localStorage
    const savedDistrict = localStorage.getItem(SELECTED_DISTRICT_KEY);
    const savedState = localStorage.getItem(SELECTED_STATE_KEY);
    if (savedDistrict && savedState) {
      setLastVisited({ state: savedState, district: savedDistrict });
    }
    
    // Set initial state and districts
    const initialDistricts = getDistrictsForState(selectedState);
    setDistricts(initialDistricts);
  }, [selectedState]);

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setSelectedDistrict('');
    const newDistricts = getDistrictsForState(state);
    setDistricts(newDistricts);
  };

  const handleViewDashboard = () => {
    if (selectedDistrict && selectedState) {
      localStorage.setItem(SELECTED_DISTRICT_KEY, selectedDistrict);
      localStorage.setItem(SELECTED_STATE_KEY, selectedState);
      router.push(`/dashboard/${selectedDistrict}`);
    }
  };

  const handleLastVisited = () => {
    if (lastVisited) {
        router.push(`/dashboard/${lastVisited.district}`);
    }
  }

  return (
    <Card className="w-full max-w-2xl shadow-2xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Select Your District</CardTitle>
        <CardDescription>Choose your state and district to see the data.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select value={selectedState} onValueChange={handleStateChange} disabled>
            <SelectTrigger className="text-lg h-14">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(mgnregaData).map((state) => (
                <SelectItem key={state} value={state} className="text-lg">
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedDistrict} onValueChange={setSelectedDistrict} disabled={!selectedState}>
            <SelectTrigger className="text-lg h-14">
              <SelectValue placeholder="Select District" />
            </SelectTrigger>
            <SelectContent>
              {districts.map((district) => (
                <SelectItem key={district} value={district} className="text-lg">
                  {district}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {lastVisited && (
            <Button variant="outline" size="lg" className="w-full justify-between h-14 text-base" onClick={handleLastVisited}>
                Continue to {lastVisited.district}
                <ChevronRight/>
            </Button>
        )}

      </CardContent>
      <CardFooter>
        <Button
          size="lg"
          className="w-full h-14 text-lg"
          disabled={!selectedDistrict}
          onClick={handleViewDashboard}
        >
          View Dashboard
        </Button>
      </CardFooter>
    </Card>
  );
}
