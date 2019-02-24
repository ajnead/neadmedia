import React from 'react';
import Routes from '../navigation/routes';

const Header = (props) => {
    var pathName = window.location.pathname;

    var headerType = "none";
    for(var route of Routes){
        if(route.path===pathName){
            headerType = route.headerType;
        }
    }

    var logo = <span></span>;
    if(props.version!==null){
        logo = <span className = "version-pill">alpha</span>;
    }

    const HeaderSwitch = (props) => {
        switch(props.headerType) {
            case 'main' : return <MainHeader />
            case 'none' : return <div></div>
            default : return <MainHeader />
        }
    }

    const MainHeader = () => {
        return(
            <header className = "header" id="titleBar">
                <div className = "header-banner bg-primary text-white">
                    <span>endvr</span>{logo}
                </div>
            </header>
        )
    }

    return(
        <HeaderSwitch headerType={headerType} />
    )
}

export default Header;