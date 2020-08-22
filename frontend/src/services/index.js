import {useEffect, useRef} from "react";

export const useSetInterval = (loading, error, callback, delay) => {

    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (loading && !error) {
            const tick = () => {
                savedCallback.current();
            };

            if (delay !== null) {
                const id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }
    }, [loading, delay, error]);
};
