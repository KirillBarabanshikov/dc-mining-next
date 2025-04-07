import { ChangeEvent } from 'react';

import DownloadIcon from '@/shared/assets/icons/download.svg';
import { Button, Input } from '@/shared/ui';
import { calculatorApi } from '@/widgets/Calculator/api';
import { useCalculatorStore } from '@/widgets/Calculator/model/store';

interface Props {
  electricityCoast: string | number;
  changeElectricityCoast: (e: ChangeEvent<HTMLInputElement>) => void;
  isProError: boolean;
  totalConsumption: number;
  businessTotalPrice: number;
  profitWithoutElectricity: number;
  businessCalculationData: {
    totalConsumption: number;
    electricityConsumption: number;
    profitWithoutElectricity: number;
    profitWithElectricity: number;
    paybackWithElectricity: number;
    paybackWithoutElectricity: number;
  };
  generatePdfData: () => any;
}

const CalculatorElectricity: React.FC<Props> = ({
  electricityCoast,
  changeElectricityCoast,
  isProError,
  generatePdfData,
}) => {
  const { calculatorType, selectedPackageId } = useCalculatorStore();

  // useEffect(() => {
  // setReadyBusinessTotalPrice(businessPackageAsics.reduce((total, asic) => total + asic.price * asic.count, 0));
  // setReadyBusinessTotalPrice(businessPackages[0].price)
  // }, [calculatorType, businessPackageAsics])

  const handleDownload = async () => {
    const pdfData = generatePdfData();

    // console.log(pdfData);
    const result = await calculatorApi.postPDF(pdfData);
    if (result) {
      const blob = new Blob([result.file], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'фин_модель.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div className='calculatorElectricity'>
      <div className='calculatorElectricity-price'>
        <span>Стоимость э/э, ₽</span>
        <Input
          type='number'
          value={electricityCoast}
          onChange={(e) => changeElectricityCoast(e)}
          sizes='md'
          error={isProError || electricityCoast === ''}
        />
        {isProError && (
          <div className='calculatorElectricity-error'>
            Доступно в <span style={{ textDecoration: 'underline' }}>PRO</span>{' '}
            версии
          </div>
        )}
      </div>
      <Button
        className='calculatorElectricity-btn'
        disabled={calculatorType === 2 && !selectedPackageId}
        variant='outline'
        size='md'
        onClick={handleDownload}
      >
        Скачать фин модель
        <DownloadIcon />
      </Button>
    </div>
  );
};

export default CalculatorElectricity;
