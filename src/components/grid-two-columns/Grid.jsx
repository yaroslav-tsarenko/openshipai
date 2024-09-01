import React from 'react';
import styles from './Grid.module.scss';

const Grid = ({ children, columns = '0, 0' }) => {
    const gridStyle = {
        gridTemplateColumns: `repeat(${columns})`
    };

    return (
        <div className={styles.gridTwoColumns} style={gridStyle}>
            {children}
        </div>
    );
};

export default Grid;