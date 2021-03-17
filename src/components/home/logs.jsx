import React, {useState, useEffect,useRef} from 'react';
import {useSubstrate} from "../../api/contracts";

export default function Logs() {

    const {state, dispatch} = useSubstrate();
    const {message} = state;

    // const [list,setList] = useState([1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13]);
    const [list,setList] = useState([]);

    const [isScrolle, setIsScrolle] = useState(true);

    const speed = 30;
    const warper = useRef();
    const childDom1 = useRef();
    const childDom2 = useRef();

    useEffect(() => {
        if(!warper || !warper.current)return;
        childDom2.current.innerHTML = childDom1.current.innerHTML;
        let timer;
        if (isScrolle) {
            timer = setInterval(
                () =>
                    warper.current.scrollTop >= childDom1.current.scrollHeight
                        ? (warper.current.scrollTop = 0)
                        : warper.current.scrollTop++,
                speed
            );
        }
        return () => {
            clearTimeout(timer);
        };
    }, [isScrolle]);

    useEffect(() => {
        if(message == null)return;
        setList(message)
    }, [message]);
    const hoverHandler = (flag) => setIsScrolle(flag);
    return (
        <div className="rain">
            <div className="contentbg">
                <h4>LOGS</h4>
                <div className='parent' ref={warper}>
                    <div className='child' ref={childDom1}>
                        {list.map((item) => (
                            <li
                                key={`ts_${item.ts}`}
                                onMouseOver={() => hoverHandler(false)}
                                onMouseLeave={() => hoverHandler(true)}
                            >
                               [{item.service_name}]({item.user_key}) {item.request_ip} {item.request_path}
                            </li>
                        ))}
                    </div>
                    <div className='child' ref={childDom2}></div>
                </div>
            </div>
        </div>
    )
}
