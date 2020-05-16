import React from 'react'
import styles from './TableRow.module.css';

export default function TableRow(props) {
    let { workout, users } = props;

    let date = new Date(workout.date);
    let formattedDate = `${date.getDate()}. ${date.getMonth()}. ${date.getFullYear()}`

    let loss = `${styles.tData} ${styles.tDataLoss}`;
    let win = `${styles.tData} ${styles.tDataWin}`;

    const generateCells = () => {
        return (
            users.map(user => {
                if (workout.performances[user]) {
                    let score = workout.performances[user];
                    return (
                        <td key={user} className={score.win ? win : loss}> {score.value}</td >
                    )
                } else {
                    return (
                        <td key={user} className={loss} ><span role="img" aria-label="sleepy" className={styles.emoji}>😴</span></td >
                    )
                }
            }
            )
        )
    }

    return (
        <>
            <tr className={styles.tRow}>
                <td className={`${styles.tData} ${styles.date}`}>{formattedDate}</td>
                <td className={`${styles.tData} ${styles.exercise}`}>{workout.exercise}</td>
                {generateCells()}
            </tr>

        </>
    )
}
