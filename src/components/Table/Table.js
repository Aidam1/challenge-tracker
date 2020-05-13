import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import UserApi from '../../api/UserApi';
import styles from './Table.module.css';
import TableRow from '../TableRow.js/TableRow';
import UserHeader from '../UserHeader/UserHeader';
import WorkoutApi from '../../api/WorkoutApi';


export default function Table() {

    const [userData, setUserData] = useState([]);
    const [workoutsData, setWorkoutsData] = useState([]);

    const getUsers = async () => {
        let querySnapshot = await UserApi.get_users();
        let result = querySnapshot.docs.map(doc => {
            let user = doc.data();
            user.id = doc.id;
            return user;
        });
        return result;
    }

    const getWorkouts = async () => {
        let querySnapshot = await WorkoutApi.get_workouts();
        let result = querySnapshot.docs.map(doc => {
            let workout = doc.data();
            let winnerId = null;
            for (let [user, performance] of Object.entries(workout.performances)) {
                performance.win = false;
                if (!winnerId || performance.value > workout.performances[winnerId].value) {
                    winnerId = user;
                }
            }
            workout.performances[winnerId].win = true;

            return workout;
        });
        return result;
    }

    const getAllData = async () => {
        let [users, workouts] = await Promise.all([getUsers(), getWorkouts()])
        let updatedUsers = loserStreak(users, workouts);
        ReactDOM.unstable_batchedUpdates(() => {
            setUserData(updatedUsers);
            setWorkoutsData(workouts);
        })
    }


    const loserStreak = (users, workouts) => {
        let userLosses = {};
        console.log(users, workouts);

        let userSet = new Set(users.map(user => user.id));

        for (let i = 0; i < workouts.length; i++) {
            userSet.forEach(user => {

                if (!userLosses[user]) {
                    userLosses[user] = 0;
                }

                if (workouts[i].performances[user]?.win) {
                    userSet.delete(user);
                } else {
                    userLosses[user] += 1;
                }
            })
            if (userSet.size === 0) { break; }
        }

        for (let key in users) {
            users[key].loserStreak = userLosses[users[key].id];
        }

        return users;
    }

    useEffect(() => {
        getAllData();
    }, [])

    const generateUsers = () => {
        if (Array.isArray(userData) && userData.length > 0) {
            return (
                userData.map(user =>
                    <th key={user.name} className={`${styles.tHead}`}>
                        <UserHeader user={user} />
                    </th>
                )
            )
        }
    }

    const generateRows = () => {
        if (Array.isArray(workoutsData) && workoutsData.length > 0) {
            let userIds = userData.map(user => user.id);
            return (
                workoutsData.map(workout =>
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
