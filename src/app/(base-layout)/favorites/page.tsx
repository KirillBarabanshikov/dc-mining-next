import FavoritesPage from './FavoritesPage';

export function generateMetadata() {
    return {
        title: 'Избранное',
    };
}

export default function Page() {
    return <FavoritesPage />;
}
