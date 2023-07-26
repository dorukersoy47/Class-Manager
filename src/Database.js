import './index.css';
import { useEffect, useState } from 'react';
import axios from 'axios'

const Database = () => {
    
    const [students, setStudents] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/getStudents')
            .then(users => setStudents(users.data))
            .catch(err => console.log(err))
    }, [])

    return ( 
        <div className="studentDb">
            <table className="studentDbTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Level</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map(student => {
                            return <tr>
                                <td>{student.name}</td>
                                <td>{student.surname}</td>
                                <td>{student.level}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}
 
export default Database;