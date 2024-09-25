import { Breadcrumbs } from '@/shared/ui';
import { Payments } from '@/widgets';

const paths = [{ name: 'Главная', path: '/' }, { name: 'Оплата' }];

const PaymentPage = () => {
    return (
        <>
            <div className={'container'}>
                <Breadcrumbs paths={paths} />
            </div>
            <div>
                <div className={'container'}>
                    <Payments />
                </div>
            </div>
        </>
    );
};

export default PaymentPage;
