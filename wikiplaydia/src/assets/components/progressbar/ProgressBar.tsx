import React from 'react';

type ProgressBarProps = {
    progress: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({progress}) => {

    /***************
     * HOOKS
     ***************/

    /***************
     * FUNCTIONS
     ***************/

    const getStyle = () => ({
        top: 0,
        height:5,
        width: `${progress * 100}%`,
        transition: "ease-in-out .4s",
    });

    /***************
     * RENDERING
     ***************/
    return (
        <div className="wikiplaydia-green" style={getStyle()}/>
    )
};

export default ProgressBar;
