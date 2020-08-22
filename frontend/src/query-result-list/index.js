import React, {useState} from 'react'
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import QueryResult from "./query-result";
import {useSelectedReport, useSerpData} from "../store";

const QueryResultList = () => {

    const [state,{setSelectedSites}] = useSerpData();
    const {results, selectedSites} = useSelectedReport(state);

    const loading = results && results.loading;
    const data = results && results.data;

    const handleSetSelectedResults = (link) => {
      if (selectedSites[link] === undefined) {
          setSelectedSites({
              ...selectedSites,
              [link]: link,
          });
      } else {
          setSelectedSites({
              ...selectedSites,
              [link]: undefined,
          });
      }
    };

    console.log('results state:', state);

    return <List component="nav">
        {!loading && data && data.map((result, index) => {
            console.log('selectedSites', selectedSites);
            console.log('selectedSites[result.link]:', selectedSites[result.link]);
            return <>
                <QueryResult link={result.link}
                             name={result.title}
                             index={index}
                             selected={selectedSites[result.link] !== undefined}
                             setSelectedResults={() => handleSetSelectedResults(result.link)}
                />
                <Divider variant="inset" component="li"/>
            </>
        })}
    </List>;
};

export default QueryResultList;