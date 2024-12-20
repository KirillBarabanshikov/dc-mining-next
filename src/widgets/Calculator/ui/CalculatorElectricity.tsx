import { ChangeEvent } from 'react';

import DownloadIcon from '@/shared/assets/icons/download.svg'
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
}


const CalculatorElectricity: React.FC<Props> = ({electricityCoast, changeElectricityCoast, isProError, totalConsumption, profitWithoutElectricity}) => {

    const { selectedAsics, businessPackageAsics, calculatorType, readyBusinessTotalPrice, selectedPackageId, dollar } = useCalculatorStore();

    // useEffect(() => {
        // setReadyBusinessTotalPrice(businessPackageAsics.reduce((total, asic) => total + asic.price * asic.count, 0));
        // setReadyBusinessTotalPrice(businessPackages[0].price)
    // }, [calculatorType, businessPackageAsics])

    const handleDownload = async () => {

        const course = dollar;

        console.log(course)

        let pdfData;

        if (calculatorType === 1) {
            const selectedAsic = selectedAsics[0];
            const totalPrice = selectedAsic.price * selectedAsic.count;

            pdfData = {
                sumRuble: totalPrice.toLocaleString('ru-RU'),
                sumDollar: (totalPrice / course).toFixed(2),
                curs: course.toString(),
                sumIn: totalPrice.toLocaleString('ru-RU'),
                everyMonthWatt: totalConsumption.toLocaleString('ru-RU'),
                profitWithoutWatt: profitWithoutElectricity.toFixed(3),
                profitWithMonth: (totalPrice / profitWithoutElectricity).toFixed(0),
                asics: selectedAsics.map((item) => ({
                    id: item.id,
                    title: item.title,
                    hashrate: `${item.hashrate} ${item.dimension}`,
                    quantity: item.count.toLocaleString('ru-RU'),
                    priceOnePiece: (item.price / course).toFixed(2),
                    price: (item.price * item.count / course).toFixed(2),
                })),
            };
        } else if (calculatorType === 2) {
            pdfData = {
                sumRuble: readyBusinessTotalPrice.toLocaleString('ru-RU'),
                sumDollar: readyBusinessTotalPrice !== 'по запросу' ? (+readyBusinessTotalPrice / course).toFixed(2) : 'по запросу',
                curs: course.toString(),
                sumIn: readyBusinessTotalPrice.toLocaleString('ru-RU'),
                everyMonthWatt: totalConsumption.toLocaleString('ru-RU'),
                profitWithoutWatt: profitWithoutElectricity.toFixed(3),
                profitWithMonth: readyBusinessTotalPrice !== 'по запросу' ? (+readyBusinessTotalPrice / profitWithoutElectricity).toFixed(0) : 'по запросу',
                asics: businessPackageAsics.map((item) => ({
                    id: item.id,
                    title: item.title,
                    hashrate: `${item.hashrate} ${item.dimension}`,
                    quantity: item.count.toLocaleString('ru-RU'),
                    priceOnePiece: readyBusinessTotalPrice !== 'по запросу' ? (item.price / course).toFixed(2) : 'по запросу',
                    price: readyBusinessTotalPrice !== 'по запросу' ? (item.price * item.count / course).toFixed(2) : 'по запросу',
                })),
            };
        } else {
            const totalPrice = selectedAsics.reduce((total, asic) => total + asic.price * asic.count, 0);
            pdfData = {
                sumRuble: totalPrice.toLocaleString('ru-RU'),
                sumDollar: (totalPrice / course).toFixed(2),
                curs: course.toString(),
                sumIn: totalPrice.toLocaleString('ru-RU'),
                everyMonthWatt: totalConsumption.toLocaleString('ru-RU'),
                profitWithoutWatt: profitWithoutElectricity.toFixed(3),
                profitWithMonth: (totalPrice / profitWithoutElectricity).toFixed(0),
                asics: selectedAsics.map((item) => ({
                    id: item.id,
                    title: item.title,
                    hashrate: `${item.hashrate} ${item.dimension}`,
                    quantity: item.count.toLocaleString('ru-RU'),
                    priceOnePiece: (item.price / course).toFixed(2),
                    price: (item.price * item.count / course).toFixed(2),
                })),
            };
        }

        if (calculatorType !== 2 || readyBusinessTotalPrice !== 'по запросу') {
            pdfData.sumDollar = parseFloat(pdfData.sumDollar).toLocaleString('ru-RU');
            pdfData.profitWithoutWatt = parseFloat(pdfData.profitWithoutWatt).toLocaleString('ru-RU');
            pdfData.profitWithMonth = parseFloat(pdfData.profitWithMonth).toLocaleString('ru-RU');

            pdfData.asics = pdfData.asics.map(item => ({
                ...item,
                priceOnePiece: parseFloat(item.priceOnePiece).toLocaleString('ru-RU'),
                price: parseFloat(item.price).toLocaleString('ru-RU'),
            }));
        }

        console.log(pdfData);
        const result = await calculatorApi.postPDF(pdfData);
        console.log(result);
        if (result) {
            const blob = new Blob([result ], { type: 'application/pdf' });
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
                        Доступно в Pro версии
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
    )
}

export default CalculatorElectricity