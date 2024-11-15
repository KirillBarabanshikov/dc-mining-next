import { Button } from '@/shared/ui';

const CalculatorBodyLeasing = () => {
    return (
        <div className='leasing-info calculator-card leasing'>
            <div className='leasing-img'>
                <div className='leasing-content'>
                    <h2 className='leasing-content-header'>
                        Хотите получить <br /> оборудование <span>в лизинг?</span>
                    </h2>
                    <p className='leasing-content-description'>
                        Оставьте заявку, мы подберем лучшее предложение
                    </p>
                    <Button variant='solid' size='lg'>
                        Оставить заявку
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CalculatorBodyLeasing