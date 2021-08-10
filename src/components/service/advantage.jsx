import React, {useState, useEffect} from 'react';

export default function Advantage(props) {
    const {info} = props;
    return(<div className="borderBR brdr">
          <div className="contentbg">
                <dl>
                    <dt className="titleName">SERVICE USAGE</dt>
                    <dd>{info.usage}</dd>
                </dl>
            </div>

    </div>)
}
