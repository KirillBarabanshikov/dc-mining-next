import { CalculatorTotal } from '@/widgets/Calculator/ui/CalculatorTotal';

interface Props {
  totalConsumptionDataCenter: number;
  calculatorType: number;
  businessCalculationData: {
    totalConsumption: number;
    electricityConsumption: number;
    profitWithoutElectricity: number;
    profitWithElectricity: number;
    paybackWithElectricity: number;
    paybackWithoutElectricity: number;
  };
  isEditBusinessDetails: boolean;
  electricityConsumption: number;
  totalConsumption: number;
  profitWithoutElectricity: number;
  profitWithElectricity: number;
  paybackWithElectricity: number;
  paybackWithoutElectricity: number;
  matches: boolean;
  generatePdfData: () => any;
}

const CalculatorTotalWrapper: React.FC<Props> = ({
  totalConsumptionDataCenter,
  businessCalculationData,
  matches,
  calculatorType,
  electricityConsumption,
  isEditBusinessDetails,
  totalConsumption,
  paybackWithElectricity,
  paybackWithoutElectricity,
  profitWithElectricity,
  profitWithoutElectricity,
  generatePdfData,
}) => {
  return (
    <CalculatorTotal
      generatePdfData={generatePdfData}
      matches={matches}
      totalConsumptionDataCenter={totalConsumptionDataCenter.toLocaleString(
        'ru-RU',
        { maximumFractionDigits: 0 },
      )}
      totalConsumptonGuests={(
        totalConsumptionDataCenter +
        totalConsumptionDataCenter * 0.1
      ).toLocaleString('ru-RU', { maximumFractionDigits: 0 })}
      totalConsumption={
        calculatorType === 2 &&
        !isEditBusinessDetails &&
        businessCalculationData.totalConsumption
          ? businessCalculationData.totalConsumption.toLocaleString('ru-RU', {
              maximumFractionDigits: 0,
            })
          : isNaN(businessCalculationData.totalConsumption) &&
              calculatorType === 2
            ? String(0)
            : totalConsumption.toLocaleString('ru-RU', {
                maximumFractionDigits: 0,
              })
      }
      electricityConsumption={
        calculatorType === 2 &&
        !isEditBusinessDetails &&
        businessCalculationData.electricityConsumption
          ? businessCalculationData.electricityConsumption.toLocaleString(
              'ru-RU',
              { maximumFractionDigits: 0 },
            )
          : isNaN(businessCalculationData.electricityConsumption) &&
              calculatorType === 2
            ? String(0)
            : electricityConsumption.toLocaleString('ru-RU', {
                maximumFractionDigits: 0,
              })
      }
      totalPriceGuests={(
        electricityConsumption +
        electricityConsumption * 0.1
      ).toLocaleString('ru-RU', { maximumFractionDigits: 0 })}
      profitWithoutElectricity={
        calculatorType === 2 &&
        !isEditBusinessDetails &&
        businessCalculationData.profitWithoutElectricity
          ? businessCalculationData.profitWithoutElectricity.toLocaleString(
              'ru-RU',
              { maximumFractionDigits: 0 },
            )
          : isNaN(businessCalculationData.profitWithoutElectricity) &&
              calculatorType === 2
            ? String(0)
            : profitWithoutElectricity.toLocaleString('ru-RU', {
                maximumFractionDigits: 0,
              })
      }
      profitWithElectricity={
        calculatorType === 2 &&
        !isEditBusinessDetails &&
        businessCalculationData.profitWithElectricity
          ? businessCalculationData.profitWithElectricity.toLocaleString(
              'ru-RU',
              { maximumFractionDigits: 0 },
            )
          : isNaN(businessCalculationData.profitWithElectricity) &&
              calculatorType === 2
            ? String(0)
            : profitWithElectricity.toLocaleString('ru-RU', {
                maximumFractionDigits: 0,
              })
      }
      paybackWithElectricity={
        calculatorType === 2 &&
        !isEditBusinessDetails &&
        businessCalculationData.paybackWithElectricity
          ? businessCalculationData.paybackWithElectricity.toFixed(1)
          : isNaN(businessCalculationData.paybackWithElectricity) &&
              calculatorType === 2
            ? String(0)
            : paybackWithElectricity.toFixed(1)
      }
      paybackWithoutElectricity={
        calculatorType === 2 &&
        !isEditBusinessDetails &&
        businessCalculationData.paybackWithoutElectricity
          ? businessCalculationData.paybackWithoutElectricity.toFixed(1)
          : isNaN(businessCalculationData.paybackWithoutElectricity) &&
              calculatorType === 2
            ? String(0)
            : paybackWithoutElectricity.toFixed(1)
      }
    />
  );
};

export default CalculatorTotalWrapper;
