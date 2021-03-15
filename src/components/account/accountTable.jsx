import React, {useState, useEffect} from 'react';
export default function AccountTable(props) {
    return (
        <div className="borderBR">
            <div className="contenttable">
                <table cellPadding="0" cellSpacing="0">
                    <thead>
                    <tr>
                        <th>name</th>
                        <th>type</th>
                        <th>type</th>
                        <th>price</th>
                    </tr>
                    </thead>
                    <tbody>

                    <tr>
                        <td>Alice</td>
                        <td>type1</td>
                        <td>type2</td>
                        <td>$32,249</td>
                    </tr>
                    <tr>
                        <td>Alice</td>
                        <td>type1</td>
                        <td>type2</td>
                        <td>$32,249</td>
                    </tr>
                    <tr>
                        <td>Alice</td>
                        <td>type1</td>
                        <td>type2</td>
                        <td>$32,249</td>
                    </tr>
                    <tr>
                        <td>Alice</td>
                        <td>type1</td>
                        <td>type2</td>
                        <td>$32,249</td>
                    </tr>

                    </tbody>
                </table>
            </div>
        </div>
    )
}
