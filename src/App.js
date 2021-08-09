import Routerlink from './router/router'
import FootBtm from "./components/footBtm";
import React from "react";
import Header from "./components/header";
import { SubstrateContextProvider} from './api/contracts';

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
        </div>

    );
}
export default App;
