import React, {useState, useEffect,useRef} from 'react';

export default function Logs() {
    const [list] = useState([1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13]);

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
    const hoverHandler = (flag) => setIsScrolle(flag);


    return (
        <div className="rain">
            <div className="contentbg">
                <h4>LOGS</h4>
                <div className='parent' ref={warper}>
                    <div className='child' ref={childDom1}>
                        {list.map((item) => (
                            <li
                                key={item}
                                onMouseOver={() => hoverHandler(false)}
                                onMouseLeave={() => hoverHandler(true)}
                            >
                                {item}runoob@runoob:~$ docker logs -f mynginx
                            </li>
                        ))}
                    </div>
                    <div className='child' ref={childDom2}></div>
                </div>
            </div>
        </div>
    )
}
