import React, { useContext } from 'react';
import styles from './Table.module.css';
import TableRow from '../TableRow.js/TableRow';
import UserHeader from '../UserHeader/UserHeader';
import { StateContext } from '../../providers/StateProvider';


export default function Table() {
    const { users, workouts } = useContext(StateContext);

    const loserStreak = (user_id) => {
        let losses = 0;
        for (const workout of workouts) {
            if (!workout.performances[user_id]?.win) {
                losses += 1;
            } else {
                break;
            }
        }
        return losses;
    }

    const generateUsers = () => {
        if (Object.keys(users).length > 0) {
            return (
                Object.keys(users).map(user =>
                    <th key={user} className={`${styles.tHead}`}>
                        <UserHeader user={users[user]} losses={loserStreak(user)} />
                    </th>
                )
            )
        }
    }

    const generateRows = () => {
        if (Array.isArray(workouts) && workouts.length > 0) {
            let userIds = Object.keys(users);
            return (
                workouts.map(workout =>
                    <TableRow key={workout.date} workout={workout} users={userIds} />
                )
            )
        }
    }

    return (
        <table className={`${styles.table}`}>
            <thead >
                <tr>
                    <th className={`${styles.tHead} `}>Den</th>
                    <th className={`${styles.tHead}`}>Cvik</th>
                    {generateUsers()}
                </tr>
            </thead>
            <tbody>
                {generateRows()}
            </tbody>
        </table>
    )
}
