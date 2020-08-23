
export const getResults = async (reportId, email, setResults, setError) => {
    try {
        const url = `serp/report/${reportId}`;
        const response = await fetch(url,  {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'email': email,
            }
        }).then(res => res.json());

        if (response && !response.loading) {
            setResults(response)
        }
    } catch (e) {
        setError(e);
    }
};