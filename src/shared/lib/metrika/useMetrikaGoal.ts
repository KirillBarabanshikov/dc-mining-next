export const useMetrikaGoal = () => {
    const sendMetrikaGoal = () => {
        if (typeof window !== 'undefined' && window.ym) {
            window.ym(98130237, 'reachGoal', 'metrika_goal');
        }
    };

    return { sendMetrikaGoal };
};
