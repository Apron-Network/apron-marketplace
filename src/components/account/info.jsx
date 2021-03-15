import React, {useState, useEffect} from 'react';
export default function Info(props) {
    return <div className="rain">
        <div className="contentbg info">
            <h4>ACCOUNT INFO</h4>
            <ul>
                <li>
                    <div className="row">
                        <div className="col-3 lft">Name</div>
                        <div className="col-9 rht">0xc80791c130913b1ead9d891114b94fae6d92cfbe1ce29093</div>
                    </div>
                </li>
                <li>
                    <div className="row">
                        <div className="col-3 lft">AccountID</div>
                        <div className="col-9 rht">0xc80791c130913b1ead9d891114b94fae6d92cfbe1ce29093</div>
                    </div>
                </li>
                <li>
                    <div className="row">
                        <div className="col-3 lft">Balance</div>
                        <div className="col-9 rht">0xc80791c130913b1ead9d891114b94fae6d92cfbe1ce29093</div>
                    </div>
                </li>
                <li>
                    <div className="row">
                        <div className="col-3 lft">Expiration</div>
                        <div className="col-9 rht">0xc80791c130913b1ead9d891114b94fae6d92cfbe1ce29093</div>
                    </div>
                </li>

            </ul>
        </div>
    </div>
}
