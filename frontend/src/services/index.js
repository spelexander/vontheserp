import {useEffect, useRef} from "react";

export const useSetInterval = (reportId, loading, error, callback, delay) => {

    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (reportId && loading && !error) {
            const tick = () => {
                savedCallback.current();
            };

            if (delay !== null) {
                const id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }
    }, [reportId, loading, delay]);
};
