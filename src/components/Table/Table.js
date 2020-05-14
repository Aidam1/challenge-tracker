import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import UserApi from '../../api/UserApi';
import styles from './Table.module.css';
import TableRow from '../TableRow.js/TableRow';
import UserHeader from '../UserHeader/UserHeader';
import WorkoutApi from '../../api/WorkoutApi';
import SpinnerLoader from '../SpinnerLoader/SpinnerLoader';


export default function Table() {

    const [userData, setUserData] = useState([]);
    const [workoutsData, setWorkoutsData] = useState([]);
    const [isLoadingData, setIsLoadingData] = useState(true);

    const getUsers = async () => {
        let userObj = {}
        let querySnapshot = await UserApi.get_users();
        querySnapshot.docs.forEach(doc => {
            userObj[doc.id] = doc.data()
        });
        return userObj;
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

    const loserStreak = (users, workouts) => {
        Object.keys(users).forEach(user => {
            users[user].loserStreak = 0;
            for (const workout of workouts) {
                if (!workout.performances[user]?.win) {
                    users[user].loserStreak += 1;
                } else {
                    break;
                }
            }
        })
        return users;
    }

    useEffect(() => {
        const getAllData = async () => {
            let [users, workouts] = await Promise.all([getUsers(), getWorkouts()])
            let updatedUsers = loserStreak(users, workouts);
            ReactDOM.unstable_batchedUpdates(() => {
                setUserData(updatedUsers);
                setWorkoutsData(workouts);
                setIsLoadingData(false);
            })
        }
        getAllData();
    }, [])

    const generateUsers = () => {
        if (Object.keys(userData).length > 0) {
            return (
                Object.keys(userData).map(user =>
                    <th key={user} className={`${styles.tHead}`}>
                        <UserHeader user={userData[user]} />
                    </th>
                )
            )
        }
    }


    const generateRows = () => {
        if (Array.isArray(workoutsData) && workoutsData.length > 0) {
            let userIds = Object.keys(userData);
            return (
                workoutsData.map(workout =>
                    <TableRow key={workout.date} workout={workout} users={userIds} />
                )
            )
        }
    }

    return (
        isLoadingData ? <SpinnerLoader /> :
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
