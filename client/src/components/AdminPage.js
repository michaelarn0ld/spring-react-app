import { useState, useEffect } from "react";

function AdminPage() {

    const [ errors, setErrors ] = useState([]);
    const [ users, setUsers ] = useState([]);
    const [ username, setUsername ] = useState("");
    const [ role, setRole ] = useState("");
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ membershipId, setMembershipId ] = useState(NaN);
    const [ email, setEmail ] = useState("");
    const [ phone, setPhone ] = useState("");
    const [ editingUserId, setEditingToDoId ] = useState(NaN);
    const [ view, setView ] = useState("Main");



    //View all members
    const renderUsers = () => {
        return users.map(user => <li key={user.userId}>
        <div className="row">
        <div className="col-8">
        {user.firstName}
        <span> </span>
        {user.lastName}
        </div>
        <div className="col-2">
        <span className="clickable" onClick={() => editUser(user.UserId)}>✏️</span>
        </div>
        <span className="clickable" onClick={() => deleteUser(user.userId)}>🗑️</span>
        </div>

    </li>        
    )
    }


    //Find members by first and last name



    //edit a member
    const editUser = (userId) => {

    }


    //delete a member
    const deleteUser = (userId) => {

    }


    //toggle the availability of reservables



    return ( 
        <div>This is the admin page component</div>
     );
}

export default AdminPage;