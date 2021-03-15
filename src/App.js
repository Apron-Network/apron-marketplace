import Routerlink from './router/router'
import FootBtm from "./components/footBtm";
import React from "react";
import Header from "./components/header";
import { SubstrateContextProvider} from './api/contracts';
import Bg from "./components/bg";


function App(props) {
    return (
        <div className='appBg'>
            <SubstrateContextProvider>
                <div className="bgTop">
                    <div className="maincontent">
                        <div className="contentindex">
                            <Header />
                            <Routerlink />
                            <FootBtm />
                        </div>
                    </div>
                </div>
            </SubstrateContextProvider>
            <Bg />
        </div>

    );
}
export default App;
