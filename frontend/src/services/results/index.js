
export const getResults = async (reportId, setResults, setError) => {
    try {
        const url = `serp/report/${reportId}`;
        const response = await fetch(url)
            .then(res => res.json());

        if (response && !response.loading) {
            setResults(response)
        }
    } catch (e) {
        setError(e);
    }
};