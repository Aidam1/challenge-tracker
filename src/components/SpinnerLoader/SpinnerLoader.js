import React from 'react'
import styles from './SpinnerLoader.module.css'


function SpinnerLoader() {
    return (
        <div className={`${styles.center}`}>
            <i className={`fas fa-virus fa-spin`}></i>
        </div>
    )
}

export default SpinnerLoader
