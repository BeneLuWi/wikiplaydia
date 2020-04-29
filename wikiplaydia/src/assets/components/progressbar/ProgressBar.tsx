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
        position: "sticky" as "sticky",
        top: 0,
        height: progress < 1 ? 10 : 5,
        width: `${progress * 100}%`,
        transition: "ease-in-out .4s",
    })

    /***************
     * RENDERING
     ***************/
    return (
        <div className="w3-green w3-round" style={getStyle()}/>
    )
};

export default ProgressBar;
