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
        if(!warper.current)return
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
        if(!message)return;
        let arr = [];
        arr = list;
        arr.push(message)
        // arr.push({ts:1615890546496,service_name:"1615890545354",user_key:"e5697eb2-060f-4d97-b3d0-789eb53af017",request_ip:"127.0.0.1",request_path:"anything/aaa"})
        setList([...arr])
    }, []);
    const hoverHandler = (flag) => setIsScrolle(flag);


    return (
        <div className="rain">
            <div className="contentbg">
                <h4>LOGS</h4>
                <div className='parent' ref={warper}>
                    <div className='child' ref={childDom1}>
                        {list.map((item) => (
                            <li
                                key={item.service_name}
                                onMouseOver={() => hoverHandler(false)}
                                onMouseLeave={() => hoverHandler(true)}
                            >
                               [{item.service_name}]({item.user_key}) {item.request_path} {item.request_path}
                            </li>
                        ))}
                    </div>
                    <div className='child' ref={childDom2}></div>
                </div>
            </div>
        </div>
    )
}
