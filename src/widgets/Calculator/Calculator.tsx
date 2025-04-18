'use client';
import './Calculator.scss';

import clsx from 'clsx';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent, FC, Fragment, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import ArrowDown from '@/shared/assets/icons/arrow-down2.svg';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/lib';
import { Button } from '@/shared/ui';
import { IAsic, IProduct } from '@/widgets/Calculator/types';
import CalculatorAsicsData from '@/widgets/Calculator/ui/CalculatorAsicsData';
import CalculatorBodyLeasing from '@/widgets/Calculator/ui/CalculatorBodyLeasing';
import CalculatorBusinessIsEditing from '@/widgets/Calculator/ui/CalculatorBusinessIsEditing';
import CalculatorChangeBusinessPackage from '@/widgets/Calculator/ui/CalculatorChangeBusinessPackage';
import CalculatorElectricity from '@/widgets/Calculator/ui/CalculatorElectricity';
import { CalculatorHead } from '@/widgets/Calculator/ui/CalculatorHead';
import CalculatorTitleFeatureRow from '@/widgets/Calculator/ui/CalculatorTitleFeatureRow';
import CalculatorTotalWrapper from '@/widgets/Calculator/ui/CalculatorTotalWrapper';

import { calculatorApi } from './api';
import CalculatorAsics from './lib/calculator';
import { useCalculatorStore } from './model/store';

interface Props {
  className?: string;
  type?: 'lite' | 'pro';
  isManager?: boolean;
  singleType?: number;
  variant?: 'default' | 'product';
  defaultAsicId?: number;
  title?: string;
  defaultOpenAccordionId?: number;
}

export const Calculator: FC<Props> = ({
  className,
  type = 'lite',
  isManager = false,
  singleType,
  variant = 'default',
  defaultAsicId,
  title,
  defaultOpenAccordionId,
}) => {
  const {
    calculatorType,
    calculatorTypes,
    electricityCoast,
    asics,
    selectedAsics,
    setAsics,
    setSelectedAsics,
    setElectricityCoast,
    addSelectedAsics,
    readyBusinessAsics,
    setReadyBusinessAsics,
    businessPackageAsics,
    setBusinessPackageAsics,
    addBusinessPackageAsic,
    setBusinessPackages,
    setSelectedPackageId,
    selectedPackageId,
    setDollar,
    setReadyBusinessTotalPrice,
    readyBusinessTotalPrice,
    businessPackages,
    setIsNewPackage,
    isNewPackage,
    dollar,
    setCalculatorType,
  } = useCalculatorStore();
  const matches = useMediaQuery(MAX_WIDTH_MD);

  const [isPro, setIsPro] = useState(type === 'pro');
  const [isProError, setIsProError] = useState(false);
  const [totalConsumption, setTotalConsumption] = useState(0);
  const [totalConsumptionDataCenter, setTotalConsumptionDataCenter] =
    useState(0);
  const [electricityConsumption, setElectricityConsumption] = useState(0);
  const [profitWithoutElectricity, setProfitWithoutElectricity] = useState(0);
  const [profitWithElectricity, setProfitWithElectricity] = useState(0);
  const [paybackWithElectricity, setPaybackWithElectricity] = useState(0);
  const [paybackWithoutElectricity, setPaybackWithoutElectricity] = useState(0);
  const [calculatorAsics, setCalculatorAsics] = useState<CalculatorAsics>();
  const [isEditBusinessDetails, setIsEditBusinessDetails] = useState(false);
  const [businessInitialItems, setBusinessInitialItems] = useState<IProduct[]>(
    [],
  );
  const [businessCalculationAsics, setBusinessCalculationAsics] = useState<
    IAsic[]
  >([]);
  const [isEditingTouched] = useState(false);
  const [businessTotalPrice, setBusinessTotalPrice] = useState(0);

  const [businessCalculationData, setBusinessCalculationData] = useState({
    totalConsumption: 0,
    electricityConsumption: 0,
    profitWithoutElectricity: 0,
    profitWithElectricity: 0,
    paybackWithElectricity: 0,
    paybackWithoutElectricity: 0,
  });

  const changeElectricityCoast = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (!isPro) {
      e.preventDefault();
      setIsProError(true);
      return;
    }

    setElectricityCoast(newValue);
    setIsProError(false);
  };

  const path = usePathname();

  const toggleProMode = () => {
    if (path !== '/calculator') {
      router.push('/calculator');
    }
    // setIsPro(true);
  };

  useEffect(() => {
    if (path === '/calculator' || type === 'pro') {
      setIsPro(true);
    } else {
      setIsPro(false);
    }
  }, [path]);

  const onAsicChange = (selected: string[], index: number) => {
    if (isNewPackage) {
      const changedAsic = readyBusinessAsics.find(
        (item) => item.value === selected[0],
      );
      if (!changedAsic) return;

      const updatedBusinessPackageAsics = businessPackageAsics.map((asic, i) =>
        i === index
          ? {
              ...changedAsic,
              additionalId: businessPackageAsics[index].additionalId,
              count: businessPackageAsics[index].count,
              isInitial: businessPackageAsics[index].isInitial,
            }
          : asic,
      );
      setBusinessPackageAsics(updatedBusinessPackageAsics);
    } else {
      if (selectedAsics[index].value === selected[0]) return;
      const changedAsic = asics.find((item) => item.value === selected[0]);
      if (!changedAsic) return;
      const updatedAsic = { ...changedAsic, additionalId: uuidv4() };
      const newSelectedAsics = selectedAsics.map((asic, i) =>
        i === index ? updatedAsic : asic,
      );

      setSelectedAsics(newSelectedAsics);
    }
  };

  const setAsicsCount = (count: number, index: number) => {
    if (count <= 0) return;

    // businessPackageAsics
    if (isEditBusinessDetails || isNewPackage) {
      const updatedBusinessPackageAsics = businessPackageAsics.map((asic, i) =>
        i === index ? { ...asic, count } : asic,
      );
      setBusinessPackageAsics(updatedBusinessPackageAsics);
      // calculateTotalPrice();
    }
    // selectedAsics
    else {
      const changedAsic = selectedAsics[index];
      if (!changedAsic) return;
      const updatedAsic = {
        ...changedAsic,
        count,
      };
      const newSelectedAsics = selectedAsics.map((asic, i) =>
        i === index ? updatedAsic : asic,
      );
      setSelectedAsics(newSelectedAsics);
    }
  };

  const getTotalPrice = () => {
    return (
      isEditBusinessDetails ? businessPackageAsics : selectedAsics
    ).reduce((total, asic) => total + asic.price * asic.count, 0);
  };

  const handleChangeBusinessDetails = () => {
    if (!isPro && calculatorType === 2) {
      setIsProError(true);
      return;
    }

    const newPackage = {
      id: 12345,
      price: selectedAsics[0].price,
      title: 'Новый пакет',
      productAdd: [
        {
          id: 12345678,
          productAsics: {
            ...selectedAsics[0],
            initialCount: 1,
            isInitial: true,
          },
        },
      ],
    };

    setIsNewPackage(true);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setBusinessPackages([...businessPackages, newPackage]);

    setBusinessTotalPrice(getTotalPrice());
    setSelectedPackageId(12345);
    setBusinessPackageAsics([selectedAsics[0]]);
    setReadyBusinessTotalPrice(selectedAsics[0].price);
  };

  const addAsic = (asicId: number) => {
    const newAsic = asics.find((asic) => asic.id === asicId);

    if (!newAsic) return;

    addSelectedAsics(newAsic);

    // console.log(selectedAsics);
  };

  useEffect(() => {
    if (calculatorType === 2) {
      setBusinessCalculationAsics(businessPackageAsics);
    }
  }, [calculatorType, businessPackageAsics]);

  useEffect(() => {
    if (isPro) {
      setIsProError(false);
    }
  }, [isPro]);

  useEffect(() => {
    const fetchData = async () => {
      let data;
      let businessReadyData;
      if (calculatorType !== 2) {
        data = await calculatorApi.getAsics();
        setSelectedPackageId(null);
      } else if (calculatorType === 2) {
        businessReadyData = await calculatorApi.getBusiness();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setBusinessPackages(businessReadyData);

        // setSelectedAsics([selectedAsics[0]]);

        const asicMinersData = await calculatorApi.getAsics();
        if (asicMinersData) {
          setReadyBusinessAsics(asicMinersData.products);
          setBusinessInitialItems(asicMinersData.products);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setBusinessPackageAsics(businessReadyData);
          setReadyBusinessTotalPrice(0);

          setSelectedAsics([selectedAsics[0]]);
        }
      }

      if (!data) return;

      const products = data.products;

      // console.log(data);
      setDollar(data.dollar);

      setAsics(products);
      setElectricityCoast(data.electricityCoast || 3);
      setSelectedAsics([products[0]]);
    };

    fetchData();
    setIsEditBusinessDetails(false);
    setIsNewPackage(false);
  }, [calculatorType]);

  useEffect(() => {
    const currentAsicsForCalculation = isEditBusinessDetails
      ? businessPackageAsics
      : calculatorType === 2
        ? businessCalculationAsics
        : selectedAsics;

    if (!currentAsicsForCalculation.length) return;

    setCalculatorAsics(
      () => new CalculatorAsics(currentAsicsForCalculation, +electricityCoast),
    );
  }, [
    selectedAsics,
    businessPackageAsics,
    businessCalculationAsics,
    isEditBusinessDetails,
    calculatorType,
    electricityCoast,
  ]);

  useEffect(() => {
    if (!selectedAsics.length) return;
    setCalculatorAsics(
      () => new CalculatorAsics(selectedAsics, +electricityCoast),
    );
  }, [selectedAsics, electricityCoast]);

  useEffect(() => {
    if (!calculatorAsics) return;

    const newCalculationData = {
      totalConsumption: calculatorAsics.getTotalConsumption(),
      totalConsumptionDataCenter:
        calculatorAsics.getTotalConsumptionDataCenter(),
      electricityConsumption: calculatorAsics.getElectricityConsumption(),
      profitWithoutElectricity: calculatorAsics.getProfitWithoutElectricity(),
      profitWithElectricity: calculatorAsics.getProfitWithElectricity(),
      paybackWithElectricity: calculatorAsics.getPaybackWithElectricity(),
      paybackWithoutElectricity: calculatorAsics.getPaybackWithoutElectricity(),
    };

    if (calculatorType === 2 && !isEditBusinessDetails) {
      setBusinessCalculationData(newCalculationData);
    }

    setTotalConsumptionDataCenter(
      newCalculationData.totalConsumptionDataCenter,
    );
    setTotalConsumption(newCalculationData.totalConsumption);
    setElectricityConsumption(newCalculationData.electricityConsumption);
    setProfitWithoutElectricity(newCalculationData.profitWithoutElectricity);
    setProfitWithElectricity(newCalculationData.profitWithElectricity);
    setPaybackWithElectricity(newCalculationData.paybackWithElectricity);
    setPaybackWithoutElectricity(newCalculationData.paybackWithoutElectricity);
  }, [calculatorAsics, calculatorType, isEditBusinessDetails]);

  useEffect(() => {
    const currentAsicsForCalculation = isEditBusinessDetails
      ? businessPackageAsics
      : selectedAsics;

    if (!currentAsicsForCalculation.length) return;

    setCalculatorAsics(
      () => new CalculatorAsics(currentAsicsForCalculation, +electricityCoast),
    );
  }, [
    selectedAsics,
    businessPackageAsics,
    isEditBusinessDetails,
    electricityCoast,
  ]);

  useEffect(() => {
    if (!defaultAsicId || !asics.length) return;
    const asic = asics.find((asic) => asic.id === defaultAsicId);
    asic && setSelectedAsics([asic]);
  }, [defaultAsicId, asics]);

  const [openAccordionId, setOpenAccordionId] = useState(
    defaultOpenAccordionId,
  );

  const toggleAccordion = (item: {
    id: number;
    title: string;
    onClick: () => void;
  }) => {
    if (matches) {
      if (openAccordionId === item.id) {
        setOpenAccordionId(undefined);
      } else {
        setOpenAccordionId(item.id);
        item.onClick();
      }
    } else {
      item.onClick();
    }
  };

  const router = useRouter();

  const generatePdfData = () => {
    const course = dollar;

    // console.log(course);

    let pdfData: any;

    if (calculatorType === 1) {
      const selectedAsic = selectedAsics[0];
      const totalPrice = selectedAsic.price * selectedAsic.count;

      pdfData = {
        sumRuble: totalPrice.toLocaleString('ru-RU'),
        sumDollar: (totalPrice / course).toFixed(0),
        curs: course.toString(),
        sumIn: totalPrice.toLocaleString('ru-RU'),
        everyMonthWatt: totalConsumption.toLocaleString('ru-RU'),
        profitWithoutWatt: profitWithoutElectricity.toFixed(0),
        profitWithMonth: (totalPrice / profitWithoutElectricity).toFixed(0),
        asics: selectedAsics.map((item) => ({
          id: item.id,
          title: item.title,
          hashrate: `${item.hashrate} ${item.dimension}`,
          quantity: item.count.toLocaleString('ru-RU'),
          priceOnePiece: (item.price / course).toFixed(0),
          price: ((item.price * item.count) / course).toFixed(0),
        })),
      };
    } else if (calculatorType === 2) {
      pdfData = {
        sumRuble: readyBusinessTotalPrice.toLocaleString('ru-RU'),
        sumDollar:
          readyBusinessTotalPrice !== 'по запросу'
            ? (+readyBusinessTotalPrice / course).toFixed(0)
            : 'по запросу',
        curs: course.toString(),
        sumIn: readyBusinessTotalPrice.toLocaleString('ru-RU'),
        everyMonthWatt: totalConsumption.toLocaleString('ru-RU'),
        profitWithoutWatt:
          readyBusinessTotalPrice !== 'по запросу'
            ? profitWithoutElectricity.toFixed(0)
            : 'по запросу',
        profitWithMonth:
          readyBusinessTotalPrice !== 'по запросу'
            ? (+readyBusinessTotalPrice / profitWithoutElectricity).toFixed(0)
            : 'по запросу',
        asics: businessPackageAsics.map((item) => ({
          id: item.id,
          title: item.title,
          hashrate: `${item.hashrate} ${item.dimension}`,
          quantity: item.count.toLocaleString('ru-RU'),
          priceOnePiece:
            readyBusinessTotalPrice !== 'по запросу'
              ? (item.price / course).toFixed(0)
              : 'по запросу',
          price:
            readyBusinessTotalPrice !== 'по запросу'
              ? ((item.price * item.count) / course).toFixed(0)
              : 'по запросу',
        })),
      };
    } else {
      const totalPrice = selectedAsics.reduce(
        (total, asic) => total + asic.price * asic.count,
        0,
      );
      pdfData = {
        sumRuble: totalPrice.toLocaleString('ru-RU'),
        sumDollar: (totalPrice / course).toFixed(0),
        curs: course.toString(),
        sumIn: totalPrice.toLocaleString('ru-RU'),
        everyMonthWatt: totalConsumption.toLocaleString('ru-RU'),
        profitWithoutWatt: profitWithoutElectricity.toFixed(0),
        profitWithMonth: (totalPrice / profitWithoutElectricity).toFixed(0),
        asics: selectedAsics.map((item) => ({
          id: item.id,
          title: item.title,
          hashrate: `${item.hashrate} ${item.dimension}`,
          quantity: item.count.toLocaleString('ru-RU'),
          priceOnePiece: (item.price / course).toFixed(0),
          price: ((item.price * item.count) / course).toFixed(0),
        })),
      };
    }

    if (calculatorType !== 2 || readyBusinessTotalPrice !== 'по запросу') {
      pdfData.sumDollar = parseFloat(pdfData.sumDollar).toLocaleString('ru-RU');
      pdfData.profitWithoutWatt = parseFloat(
        pdfData.profitWithoutWatt,
      ).toLocaleString('ru-RU');
      pdfData.profitWithMonth = parseFloat(
        pdfData.profitWithMonth,
      ).toLocaleString('ru-RU');

      pdfData.asics = pdfData.asics.map((item: any) => ({
        ...item,
        priceOnePiece: parseFloat(item.priceOnePiece).toLocaleString('ru-RU'),
        price: parseFloat(item.price).toLocaleString('ru-RU'),
      }));
    }

    // if (calculatorType === 2) {
    //     console.log(pdfData.profitWithoutWatt)
    //     console.log(parseFloat(pdfData.profitWithoutWatt).toLocaleString('ru-RU'))
    // }

    const managerId = Cookies.get('manager');

    if (managerId && isManager) {
      pdfData.id = +managerId;
    }

    return {
      ...pdfData,
      type: calculatorTypes.find((type) => type.id === calculatorType)?.title,
    };
  };

  const renderCalculator = () => {
    return (
      <Fragment>
        {openAccordionId !== 4 && (
          <CalculatorAsicsData
            asics={asics}
            businessTotalPrice={businessTotalPrice}
            isEditBusinessDetails={isEditBusinessDetails}
            isEditingTouched={isEditingTouched}
            matches={matches}
            onAsicChange={onAsicChange}
            setAsicsCount={setAsicsCount}
            isManager={isManager}
          />
        )}
        {openAccordionId === 4 && <CalculatorBodyLeasing />}

        {calculatorType === 2 &&
          matches &&
          !isEditBusinessDetails &&
          selectedPackageId && (
            <CalculatorChangeBusinessPackage
              isPro={isPro}
              calculatorType={calculatorType}
              handleChangeBusinessDetails={handleChangeBusinessDetails}
              isProError={isProError}
              setIsProError={setIsProError}
            />
          )}

        {isNewPackage && matches && (
          <CalculatorBusinessIsEditing
            isEditBusinessDetails={isEditBusinessDetails}
            matches={matches}
            onAsicChange={onAsicChange}
            setAsicsCount={setAsicsCount}
            isEditingTouched={isEditingTouched}
            businessTotalPrice={businessTotalPrice}
            businessInitialItems={businessInitialItems}
            isManager={isManager}
          />
        )}

        {calculatorType === 2 &&
          isNewPackage &&
          selectedPackageId === 12345 &&
          matches && (
            <div className='calculatorFeature-row calculatorFeature-change-row'>
              <Button
                className='calculatorFeature-add-btn'
                variant='solid'
                size='sm'
                theme='gray'
                onClick={() => {
                  if (readyBusinessAsics.length > 0) {
                    addBusinessPackageAsic();
                    readyBusinessTotalPrice === 'по запросу'
                      ? setReadyBusinessTotalPrice('По запросу')
                      : setReadyBusinessTotalPrice(
                          +readyBusinessTotalPrice +
                            readyBusinessAsics[0].price,
                        );
                  }
                }}
              >
                Добавить оборудование
                <span>+</span>
              </Button>
            </div>
          )}

        {calculatorType === 3 && matches && (
          <div className='calculatorFeature-change'>
            <Button
              className='calculatorFeature-change-btn'
              variant='solid'
              size='sm'
              theme='gray'
              onClick={() => {
                if (!isPro && calculatorType === 3) {
                  setIsProError(true);
                  return;
                }

                if (readyBusinessAsics.length > 0) {
                  addAsic(29);
                }
              }}
            >
              Добавить оборудование
              <span>+</span>
            </Button>
            {isProError && (
              <div className='calculatorElectricity-error calculatorElectricity-error-change'>
                Доступно в{' '}
                <span
                  style={{ textDecoration: 'underline' }}
                  onClick={() => router.push('/calculator')}
                >
                  PRO
                </span>{' '}
                версии
              </div>
            )}
          </div>
        )}

        {matches && calculatorType !== 4 && (
          <CalculatorElectricity
            businessCalculationData={businessCalculationData}
            profitWithoutElectricity={profitWithoutElectricity}
            businessTotalPrice={businessTotalPrice}
            totalConsumption={totalConsumption}
            electricityCoast={electricityCoast}
            changeElectricityCoast={changeElectricityCoast}
            isProError={isProError}
            generatePdfData={generatePdfData}
          />
        )}

        {matches && (
          <CalculatorTotalWrapper
            generatePdfData={generatePdfData}
            matches={matches}
            totalConsumptionDataCenter={totalConsumptionDataCenter}
            calculatorType={calculatorType}
            businessCalculationData={businessCalculationData}
            isEditBusinessDetails={isEditBusinessDetails}
            electricityConsumption={electricityConsumption}
            totalConsumption={totalConsumption}
            profitWithoutElectricity={profitWithoutElectricity}
            profitWithElectricity={profitWithElectricity}
            paybackWithElectricity={paybackWithElectricity}
            paybackWithoutElectricity={paybackWithoutElectricity}
            isManager={isManager}
          />
        )}
      </Fragment>
    );
  };

  const handleNavigate = () => {
    if (isManager) return;
    router.push('/calculator');
  };

  useEffect(() => {
    if (singleType) setCalculatorType(singleType);

    return () => setCalculatorType(1);
  }, [singleType]);

  return (
    <div
      className={clsx(
        'calculator',
        variant === 'product' && 'calculator-product',
        className,
      )}
    >
      <div className={clsx('calculator-head', className)}>
        {title ? (
          <h2 className={clsx('calculator-title', 'section-title-primary')}>
            {title}
          </h2>
        ) : (
          <h2 className={clsx('calculator-title', 'section-title-primary')}>
            Рассчитайте <span>выгоду</span>
          </h2>
        )}

        {matches && (
          <>
            <CalculatorHead
              onClick={handleNavigate}
              isProError={isProError}
              isPro={isPro}
              toggleProMode={toggleProMode}
            />
            {singleType && (
              <div className={'calculator-wrap'}>{renderCalculator()}</div>
            )}
          </>
        )}
        {!singleType && (
          <div className='calculator-types'>
            {calculatorTypes.map((item) => {
              if (
                variant === 'product' &&
                (item.title === 'Готовый бизнес' || item.title === 'Лизинг')
              ) {
                return <Fragment key={item.id} />;
              }

              if (isManager && item.title === 'Лизинг') {
                return <Fragment key={item.id} />;
              }

              return (
                <div
                  key={item.id}
                  className={clsx('calculator-type-accordion', {
                    active: item.id === calculatorType,
                    open: matches && openAccordionId === item.id,
                  })}
                >
                  <div
                    onClick={() => toggleAccordion(item)}
                    className={clsx('calculator-type-accordion-header', {
                      active: item.id === calculatorType,
                    })}
                  >
                    {item.title}
                    {matches && <ArrowDown className='accordion-arrow' />}
                  </div>

                  {matches && openAccordionId === item.id && (
                    <div className='calculator-type-accordion-content'>
                      {renderCalculator()}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className='calculator-row'>
        {calculatorType !== 4 && !matches && (
          <div className='calculator-card calculatorFeature'>
            <div className='calculatorFeature-content'>
              {!matches && (
                <CalculatorHead
                  onClick={handleNavigate}
                  isPro={isPro}
                  isProError={isProError}
                  toggleProMode={toggleProMode}
                />
              )}

              <div className='calculatorFeature-list'>
                {!matches && (
                  <CalculatorTitleFeatureRow
                    calculatorType={calculatorType}
                    isEditBusinessDetails={isEditBusinessDetails}
                  />
                )}

                {!matches && (
                  <div className='calculatorFeature-data'>
                    <CalculatorAsicsData
                      asics={asics}
                      businessTotalPrice={businessTotalPrice}
                      isEditBusinessDetails={isEditBusinessDetails}
                      isEditingTouched={isEditingTouched}
                      matches={matches}
                      onAsicChange={onAsicChange}
                      setAsicsCount={setAsicsCount}
                      isManager={isManager}
                    />
                  </div>
                )}

                <div className='calculatorFeature-data'>
                  {selectedPackageId && (
                    <CalculatorBusinessIsEditing
                      isEditBusinessDetails={isEditBusinessDetails}
                      matches={matches}
                      onAsicChange={onAsicChange}
                      setAsicsCount={setAsicsCount}
                      isEditingTouched={isEditingTouched}
                      businessTotalPrice={businessTotalPrice}
                      businessInitialItems={businessInitialItems}
                      isManager={isManager}
                    />
                  )}
                </div>

                {calculatorType === 2 &&
                  !matches &&
                  !isEditBusinessDetails &&
                  selectedPackageId && (
                    <CalculatorChangeBusinessPackage
                      isPro={isPro}
                      calculatorType={calculatorType}
                      handleChangeBusinessDetails={handleChangeBusinessDetails}
                      isProError={isProError}
                      setIsProError={setIsProError}
                    />
                  )}

                {calculatorType === 2 &&
                  isNewPackage &&
                  selectedPackageId === 12345 && (
                    <div className='calculatorFeature-row calculatorFeature-change-row'>
                      <Button
                        className='calculatorFeature-add-btn'
                        variant='solid'
                        size='sm'
                        theme='gray'
                        onClick={() => {
                          if (readyBusinessAsics.length > 0) {
                            addBusinessPackageAsic();
                          }
                          if (readyBusinessTotalPrice !== 'по запросу') {
                            setReadyBusinessTotalPrice(
                              +readyBusinessTotalPrice +
                                readyBusinessAsics[0].price,
                            );
                          }
                        }}
                      >
                        Добавить оборудование
                        <span>+</span>
                      </Button>
                    </div>
                  )}

                {calculatorType === 3 && !matches && (
                  <div className='calculatorFeature-change'>
                    <Button
                      className='calculatorFeature-change-btn'
                      variant='solid'
                      size='sm'
                      theme='gray'
                      onClick={() => {
                        if (!isPro && calculatorType === 3) {
                          setIsProError(true);
                          return;
                        }
                        addAsic(29);
                      }}
                    >
                      Добавить оборудование
                      <span>+</span>
                    </Button>
                    {isProError && (
                      <div className='calculatorElectricity-error calculatorElectricity-error-change'>
                        Доступно в{' '}
                        <span
                          onClick={() => router.push('/calculator')}
                          style={{ textDecoration: 'underline' }}
                        >
                          PRO
                        </span>{' '}
                        версии
                      </div>
                    )}
                  </div>
                )}
              </div>

              {!matches && (
                <CalculatorElectricity
                  businessCalculationData={businessCalculationData}
                  profitWithoutElectricity={profitWithoutElectricity}
                  businessTotalPrice={businessTotalPrice}
                  totalConsumption={totalConsumption}
                  electricityCoast={electricityCoast}
                  changeElectricityCoast={changeElectricityCoast}
                  isProError={isProError}
                  generatePdfData={generatePdfData}
                />
              )}
              {!matches && (
                <div className='calculator-description'>
                  Не является публичной офертой
                </div>
              )}
            </div>
          </div>
        )}
        {calculatorType === 4 && !matches && <CalculatorBodyLeasing />}
        {calculatorAsics && !matches && (
          <CalculatorTotalWrapper
            generatePdfData={generatePdfData}
            matches={matches}
            totalConsumptionDataCenter={totalConsumptionDataCenter}
            calculatorType={calculatorType}
            businessCalculationData={businessCalculationData}
            isEditBusinessDetails={isEditBusinessDetails}
            electricityConsumption={electricityConsumption}
            totalConsumption={totalConsumption}
            profitWithoutElectricity={profitWithoutElectricity}
            profitWithElectricity={profitWithElectricity}
            paybackWithElectricity={paybackWithElectricity}
            paybackWithoutElectricity={paybackWithoutElectricity}
            isManager={isManager}
          />
        )}
      </div>
    </div>
  );
};
