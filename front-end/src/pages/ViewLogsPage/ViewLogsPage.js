
import { useEffect } from 'react';
import { getUserId } from '../utilities/users-service'
import { getPosts } from '../../api';

export default function ViewLogsPage () {
    
    console.log(getUserId())
    console.log( getPosts(getUserId()))
    return (
        <>
        <h1>View Logs Page!</h1>
        </>
    )
}