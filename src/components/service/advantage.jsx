import React, {useState, useEffect} from 'react';

export default function Advantage(props) {
    const {info} = props;
    return(<div className="borderBR brdr">
          <div className="contentbg">
                <dl>
                    <dt>SERVICE USAGE</dt>
                    <dd>{info.usage}</dd>
                </dl>

                <dl>
                    <dt>SERVICE DELAIMER</dt>
                    <dd>{info.declaimer}</dd>
                </dl>
            </div>

    </div>)
}
