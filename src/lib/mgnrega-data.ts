import type { StateData } from './types';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function generateDistrictData(baseDays: number, baseFunds: number, baseWorks: number) {
  const data = [];
  for (let year = 2023; year <= 2024; year++) {
    for (let i = 0; i < months.length; i++) {
      if (year === 2024 && i > 5) continue; // Data only up to June 2024

      const month = months[i];
      const variance = Math.random() * 0.4 + 0.8; // between 0.8 and 1.2
      
      const personDaysGenerated = Math.floor(baseDays * variance * (1 + Math.sin(i / 3) * 0.2));
      const totalFunds = Math.floor(baseFunds * (1.1 + Math.random() * 0.1));
      const fundsUtilised = Math.floor(totalFunds * (0.6 + Math.random() * 0.35));
      const worksCompletedTotal = Math.floor(baseWorks * variance * (1 + Math.cos(i/4) * 0.1));
      const worksAgriculture = Math.floor(worksCompletedTotal * (0.4 + Math.random() * 0.2));
      const worksInfrastructure = worksCompletedTotal - worksAgriculture;
      
      data.push({
        year,
        month,
        monthIndex: i,
        personDaysGenerated,
        totalFunds,
        fundsUtilised,
        worksCompleted: {
          total: worksCompletedTotal,
          agriculture: worksAgriculture,
          infrastructure: worksInfrastructure,
        },
      });
    }
  }
  return data;
}

export const mgnregaData: StateData = {
  "Bihar": {
    "Patna": generateDistrictData(150000, 50000000, 200),
    "Gaya": generateDistrictData(180000, 60000000, 250),
    "Muzaffarpur": generateDistrictData(160000, 55000000, 220),
    "Bhagalpur": generateDistrictData(140000, 48000000, 190),
    "Darbhanga": generateDistrictData(170000, 58000000, 240),
  },
};

export const getDistrictsForState = (state: string): string[] => {
    if (mgnregaData[state]) {
        return Object.keys(mgnregaData[state]);
    }
    return [];
};

export const getDataForDistrict = (state: string, district: string) => {
    return mgnregaData[state]?.[district] || null;
}
