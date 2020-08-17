
export const getElements = async (reportId, elementsToGet, setElements, setError) => {
    try {
        const url = `serp/report/${reportId}/elements`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                elements: elementsToGet,
            })
        }).then(res => res.json());

        if (response && !response.loading) {
            setElements(response)
        }
    } catch (e) {
        setError(e);
    }
};