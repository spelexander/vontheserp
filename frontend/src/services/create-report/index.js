
export const createReport = async (keywords, email, setReportId, setError) => {
    try {
        const response = await fetch('serp/report', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'email': email,
            },
            body: JSON.stringify({
                keywords,
                numPages: 1,
                browserConfig: {},
            })
        }).then(res => res.json());

        response && setReportId(response.id);
    } catch (e) {
        setError(e);
    }
};