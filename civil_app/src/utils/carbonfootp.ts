const calculateEmissions = async (
  distanceTraveled: number,
  fuelType: string,
) => {
  const fuelUsed = Math.random() * 50;
  const emissionFactors = {
    petrol: 8.78, // Emission factor for petrol/gasoline (kg CO2e per gallon)
    diesel: 10.21, // Emission factor for diesel (kg CO2e per gallon)
    electric: 0.7, // Emission factor for electric (kg CO2e per kilowatt)
  };
  const GWPCO2 = 1;
  const GWPCH4 = 25;
  const GWPN2O = 298;
  // @ts-ignore
  const emissionFactor = emissionFactors[fuelType] || 0;
  const fuelConsumption = fuelUsed / distanceTraveled;

  // Calculate fuel efficiency (km/L)
  const fuelEfficiency = distanceTraveled / fuelUsed;
  const CO2EmissionCarbonFootprint =
    (distanceTraveled + fuelUsed) * emissionFactor * GWPCO2;
  const CH4EmissionCarbonFootprint =
    (distanceTraveled + fuelUsed) * emissionFactor * GWPCH4;
  const N2OEmissionCarbonFootprint =
    (distanceTraveled + fuelUsed) * emissionFactor * GWPN2O;

  // Include all calculations in the result
  return {
    CO2EmissionCarbonFootprint,
    CH4EmissionCarbonFootprint,
    N2OEmissionCarbonFootprint,
    fuelConsumption,
    fuelEfficiency,
  };
};
