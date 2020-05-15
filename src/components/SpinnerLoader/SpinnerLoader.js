import React from 'react'
import styles from './SpinnerLoader.module.css'


function SpinnerLoader() {

    return (
        <div className={`${styles.center}`}>
            <img src="/virus-font-awesome.svg" className={`${styles.spin} ${styles.loader}`} alt="virus icon font awesome"></img>
            <div className={`${styles.text}`}>Načítám data...</div>
        </div>
    )
}

export default SpinnerLoader
