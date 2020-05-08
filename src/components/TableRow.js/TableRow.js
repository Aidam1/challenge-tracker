import React from 'react'

import styles from './TableRow.module.css';


export default function TableRow() {

    let loss = `${styles.tData} ${styles.tDataLoss}`;
    let win = `${styles.tData} ${styles.tDataWin}`;


    return (
        <>
            <tr className={styles.tRow}>
                <td className={`${styles.tData} ${styles.datum}`}>09.05.</td>
                <td className={styles.tData}>Dřepy</td>
                <td className={loss}>10</td>
                <td className={loss}>14</td>
                <td className={win}>19</td>
                <td className={loss}>16</td>
            </tr>
            <tr className={styles.tRow}>
                <td className={`${styles.tData} ${styles.datum}`}>08.05.</td>
                <td className={styles.tData}>Kliky</td>
                <td className={loss}>0</td>
                <td className={loss}>140</td>
                <td className={loss}>109</td>
                <td className={win}>160</td>
            </tr>

        </>
    )
}
