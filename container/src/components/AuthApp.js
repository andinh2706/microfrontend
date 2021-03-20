import React, {useRef, useEffect } from "react";
import { mount } from "authApp/AuthBootstrap";
import { useHistory } from "react-router-dom";

export default ({onSignIn, onSignOut}) => {
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
            initialPath: history.location.pathname,
            onSignIn,
            onSignOut
        });
        history.listen(onHostAppNavigate);
    }, []);

    return <div ref={ref}/>
}
