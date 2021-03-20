import React, {useState, useEffect,useRef} from 'react';

const  {mainAddress} = window;
const gateway_server = `ws://${mainAddress.basepath}:8082/detailed_logs`;

export default function Logs() {

    const [list,setList] = useState([]);


    const warper = useRef();



    useEffect(()=>{
        let socket = new WebSocket(gateway_server);

        socket.onopen = function (event) {
            console.log('Websocket connect');

        };
        socket.onmessage = function (event) {
            let obj = JSON.parse(event.data);
            let mylist = list;

            let arr = mylist.filter((item) =>item.ts === obj.ts);
            if ( !arr || !arr.length){
                mylist.push(obj);
                if(mylist.length>10){
                    mylist.shift();
                }
                setList([...mylist]);
                if(warper.current!=null){
                    warper.current.scrollTop = warper.current.scrollHeight;
                }

            }
        };

        return ()=>{
            socket.close();
        }
    },[]);
    return (
        <div className="rain">
            <div className="contentbg">
                <h4>LOGS</h4>
                <div className='parent' id='scrollBrdr' ref={warper}>
                    <div className='child'>
                        { list.map((item) => (
                            <li
                                key={`ts_${item.ts}`}
                            >
                                [{new Date(parseInt(item.ts)).toLocaleString()}]{item.service_name}({item.user_key}) {item.request_ip} {item.request_path}
                            </li>
                        ))}
                    </div>
                    <div className='child'/>
                </div>
            </div>
        </div>
    )
}
