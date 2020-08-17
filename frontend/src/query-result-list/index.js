import React, {useState} from 'react'
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import QueryResult from "./query-result";
import {useSerpData} from "../store";

const QueryResultList = () => {

    const [{pendingState, selectedSites},{setSelectedSites}] = useSerpData();

    const loading = pendingState && pendingState.loading;
    const results = pendingState && pendingState.results;

    const handleSetSelectedResults = (index) => {
      if (!selectedSites.includes(index)) {
          setSelectedSites([...selectedSites, index]);
      } else {
          const indexToRemove = selectedSites.indexOf(index);
          const newSelectedResults = [...selectedSites];
          newSelectedResults.splice(indexToRemove, 1);
          setSelectedSites(newSelectedResults);
      }
    };

    return <List component="nav">
        {results && results.map((result, index) => {
            return <>
                <QueryResult link={result.link}
                             name={result.title}
                             index={index}
                             selected={selectedSites.includes(index)}
                             setSelectedResults={() => handleSetSelectedResults(index)}
                />
                <Divider variant="inset" component="li"/>
            </>
        })}
    </List>;
};

export default QueryResultList;