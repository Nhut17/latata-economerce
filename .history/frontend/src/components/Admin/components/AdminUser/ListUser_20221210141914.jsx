import React from 'react';
import User from './User';


function ListUser({listUser}) {
    // const {users} = props

    return (
        <div className="admin-user-list">
            <table>
                <tr>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Địa chỉ</th>
                    <th>Phone</th>
                </tr>
                {
                    listUser &&
                    listUser.map((data, index) => (
                        <User data={data} stt={index} />
                    ))
                }
            </table>
        </div>
    );
}

export default ListUser;