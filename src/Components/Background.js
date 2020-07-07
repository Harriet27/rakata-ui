import React from 'react';
import bg from '../Components/assets/bg.jpg';

const Background = () => {
    return (
        <div style={styles.background}></div>
    );
};

const styles = {
    background: {
        backgroundImage: `url(${bg})`,
        height: '100%',
        width: '100%',
        zIndex: '-99',
    },
}

export default Background;
