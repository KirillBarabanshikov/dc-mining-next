import CalculatorPage from './CalculatorPage';

export function generateMetadata() {
    return {
        title: 'Калькулятор доходности',
    };
}

export default function Page() {
    return (
        <>
            <CalculatorPage />
        </>
    );
}
