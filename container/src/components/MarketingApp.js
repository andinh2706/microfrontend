import React, {useRef, useEffect } from "react";
import { mount } from "marketingApp/MarketingBootstrap";
import { useHistory } from "react-router-dom";

export default () => {
    const ref = useRef(null);
    const history = useHistory();


    useEffect(() => {
        const { onHostAppNavigate } = mount(ref.current, {
            onNavigate: ({ pathname: nextPathname }) => {
                const { pathname: currrentPathname } = history.location;
                if(nextPathname !== currrentPathname){
                    history.push(nextPathname);
                }
            },
            initialPath: history.location.pathname
        });
        history.listen(onHostAppNavigate);
    }, []);

    return <div ref={ref}/>
}
