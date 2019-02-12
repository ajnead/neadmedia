import React from 'react';

const Header = (props) => {

    var logo = <span></span>;
    if(props.version!==null){
        logo = <span className = "version-pill">alpha</span>;
    }

    return(
        <header className = "header" id="titleBar">
            <div className = "header-banner bg-primary text-white">
                <span>endvr</span>{logo}
            </div>
        </header>
    )
}

export default Header;