
export const createReport = async (keyWords, setReportId, setError) => {
    try {
        const response = await fetch('serp/report', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                keyWords,
                numPages: 1,
                browserConfig: {},
            })
        }).then(res => res.json());

        response && setReportId(response.id);
    } catch (e) {
        setError(e);
    }
};