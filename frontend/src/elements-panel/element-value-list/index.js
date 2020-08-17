import React from 'react';
import ElementValue from "./element-value";
import {ElementListWrapper} from "./styled";

const ElementValueList = (props) => {
    return <ElementListWrapper>
        {props && props.elements && props.elements.map((element, index) => {
            return <ElementValue
                key={index}
                content={element.value}
                pageName={element.result.link}
                index={element.result.rank}
                elementName={props.tag}
            />
        })}
    </ElementListWrapper>
};

export default ElementValueList;