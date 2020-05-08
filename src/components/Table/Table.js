import React, { useState } from 'react'

import styles from './Table.module.css';
import TableRow from '../TableRow.js/TableRow';
import UserHeader from '../UserHeader/UserHeader';


export default function Table() {

    const [data, setData] = useState("");


    return (
        <table className={`${styles.table}`}>
            <thead>
                <tr>
                    <th className={`${styles.tHead}`}>Den</th>
                    <th className={`${styles.tHead}`}>Cvik</th>
                    <th className={`${styles.tHead}`}><UserHeader /></th>
                    <th className={`${styles.tHead}`}><UserHeader /></th>
                    <th className={`${styles.tHead}`}><UserHeader /></th>
                    <th className={`${styles.tHead}`}><UserHeader /></th>
                </tr>
            </thead>
            <tbody>
                <TableRow />
            </tbody>
        </table>

    )
}
