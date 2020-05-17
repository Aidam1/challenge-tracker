import React from 'react'
import styles from './TableRow.module.css';

export default function TableRow(props) {
    let { workout, users } = props;

    let currentDate = new Date(workout.date);
    let formattedDate = `${currentDate.getDate()}. ${currentDate.getMonth() + 1}. ${currentDate.getFullYear()}`

    let notJoinedYetClass = `${styles.tData}`;
    let lossClass = `${styles.tData} ${styles.tDataLoss}`;
    let winClass = `${styles.tData} ${styles.tDataWin}`;

    const generateCells = () => {
        let cells = [];
        for (const [userId, user] of Object.entries(users)) {
            let cell;
            const dateJoined = new Date(user.dateJoined);
            if (dateJoined > currentDate) {
                cell = (<td key={userId} className={notJoinedYetClass}>-</td>);
            } else if (workout.performances[userId]) {
                const { win, value } = workout.performances[userId];
                const cssClass = win ? winClass : lossClass;
                cell = (<td key={userId} className={cssClass}>{value}</td>);
            } else {
                cell = (<td key={userId} className={lossClass}><span role="img" aria-label="sleepy" className={styles.emoji}>😴</span></td>);
            }
            cells.push(cell)
        }
        return cells
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
