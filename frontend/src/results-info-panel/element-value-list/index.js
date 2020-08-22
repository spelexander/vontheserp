import React, {useCallback, useEffect, useMemo, useState} from 'react';
import ElementValue from "./element-value";
import {ElementListWrapper} from "./styled";
import {ChipInputStyled} from "../../query-entry/styled";
import {useSelectedReport, useSerpData} from "../../store";
import {useSetInterval} from "../../services";
import ElementChip from "./element-chip";
import {buildSearchTerms} from "../../services/utils";
import ElementsLoading from "./loading";

const defaultLabels = [
    'h1',
    'h2',
    'h3',
    'a',
    'img',
    'meta:description',
    'title',
    'p'
];


const ElementValueList = () => {

    const [displayLabel, setDisplayLabel] = useState('h1');
    const [selectedLabels, setSelectedLabels] = useState(defaultLabels);
    const [renderState, setRenderState] = useState({
        loading: false,
        data: null,
    });

    const [state, {fetchElements}] = useSerpData();
    const {selectedReport, results, elements, selectedSites, keyWords} = useSelectedReport(state);

    const loading = elements.loading;
    const error = results.error;
    const data = elements && elements.data;

    // Rendered elements based on selected sites and selected tag
    const getDataToRender = useCallback(() => (data[displayLabel] || []).filter(elem =>
        Object.values(selectedSites).filter(value => value !== undefined).length === 0 ||
        selectedSites[elem.result.link] !== undefined
    ), [selectedSites, data, displayLabel]);
    const dataToRender = useMemo(() => data && data[displayLabel] ? getDataToRender() : [], [data, displayLabel, selectedReport, selectedSites]);

    // handling elements selection with chip panel
    const handleAddChip = (chip) => {
        setSelectedLabels(selectedLabels.concat([chip]));
    };

    const handleDeleteChip = (chip, index) => {
        if (index > -1) {
            const labelsCopy = [...selectedLabels];
            labelsCopy.splice(index, 1);
            setSelectedLabels(labelsCopy);
        }
    };

    const toggleSelect = (value) => {
        setRenderState({
            loading: true,
            data: null,
        });

        if (displayLabel === value) {
            setDisplayLabel(null);
        } else {
            setDisplayLabel(value);
        }
    };

    // polling server for data
    const pollServer = useCallback(async () => {
        if (loading) {
            fetchElements(selectedLabels);
        }
    }, [loading, selectedLabels, fetchElements]);

    useSetInterval(loading, error, pollServer, 2000);

    // for highlighting
    const searchTerms = keyWords && buildSearchTerms(keyWords);

    // for async render of rows
    const hasData = dataToRender && dataToRender.length > 0;
    const renderElements = async () =>
        hasData &&
        dataToRender.map((element, index) => <ElementValue
                key={index}
                content={element.value}
                pageName={element.result.link}
                index={element.result.rank}
                elementName={displayLabel}
                searchTerms={searchTerms}
            />);


    const renderLoadingElements = () =>
        [1, 2, 3].map((element, index) => <ElementValue
            key={index}
            loading={true}
        />);

    useEffect(() => {
        if (hasData) {
            setRenderState({
                loading: true,
                data: null,
            });

            const timer = setTimeout(async () => {
                const renderedElements = await renderElements();
                setRenderState({
                    loading: false,
                    data: renderedElements,
                });
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [dataToRender]);

    if (loading) {
        return <ElementsLoading/>
    }

    return <ElementListWrapper>
        <ChipInputStyled
            value={selectedLabels}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip, index) => handleDeleteChip(chip, index)}
            chipRenderer={(args) => {
                const props = {
                    ...args,
                    ...{
                        selected: displayLabel,
                        toggleSelect
                    }
                };
                return <ElementChip {...props}/>
            }}
        />
        {renderState.loading && renderLoadingElements()}
        {renderState.data ? renderState.data : null}
    </ElementListWrapper>
};

export default ElementValueList;