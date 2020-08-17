
export const getLoading = async (reportId) => {
    try {
        const url = `serp/report/${reportId}/loading`;
        const response = await fetch(url).then(res => res.json());

        return response && response.loading;
    } catch (e) {
        console.error(e);
    }

    return null;
};