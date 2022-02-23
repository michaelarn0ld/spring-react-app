import { useState, useEffect } from "react";

function AdminPage() {

    const [ errors, setErrors ] = useState([]);
    const [ users, setUsers ] = useState([]);
    const [ username, setUsername ] = useState("");
    const [ authorities, setAuthorities ] = useState([]);
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ membershipId, setMembershipId ] = useState(NaN);
    const [ email, setEmail ] = useState("");
    const [ phone, setPhone ] = useState("");
    const [ address, setAddress ] = useState("");
    const [ city, setCity ] = useState("");
    const [ state, setState ] = useState("");
    const [ zipCode, setZipCode ] = useState("");
    const [ editingUserId, setEditingUserId ] = useState(NaN);
    const [ view, setView ] = useState("Main");



    useEffect(() => {
        fetch("http://localhost:8080/user")
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(errors => console.log(errors));
    }, []);

   //delete a member
   const deleteUser = (userId) => {

    fetch( `http://localhost:8080/user/${userId}`, { method: "DELETE"} )

    .then(response => {
        if(response.status === 204) {
            const filteredUsers = users.filter(user => user.userId !== userId);
            setUsers(filteredUsers);

        } else if(response.status === 404) {
            return Promise.reject("User not found");

        } else {
            return Promise.reject(`Delete failed with status: ${response.status}`)

        }
    })
    .catch(console.log);
}

    //Find members by first and last name



    //edit a member
    const editUser = (userId) => {
        setView("Edit");
        setEditingUserId(userId);
        const userToEdit = users.find(user => user.userId === userId);
        setUsername(userToEdit.username);
        setAuthorities(userToEdit.authorities);
        setFirstName(userToEdit.firstName);
        setLastName(userToEdit.lastName);
        setMembershipId(userToEdit.membershipId);
        setEmail(userToEdit.email);
        setPhone(userToEdit.phone);
    }

    //adding + editing members
    const onSubmit = (event) => {
        event.preventDefault();

        if(!isNaN(editingUserId)) {
            
            const editUserObject = {
                id: editingUserId,
                membershipId,
                email,
                username,
                firstName,
                lastName,
                phone,
                address,
                city,
                state,
                zipCode,
                authorities
            };

            const initUpdate = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer {{jwt}}"
            },
            body: JSON.stringify(editUserObject)
        };

        fetch("http://localhost:8080/user/update", initUpdate)
            .then(response => {
                if(response.status === 204) {
                    return null;
                }
                else if(response.status === 400) {
                    return response.json();
                }
                return Promise.reject("Unexpected response from the server")
            })
            .then(data => {
                if(!data){
                    const editingUsers = [...users];
                    const indexOfEdit = editingUsers.findIndex(user => user.userId === editingUserId);

                    editingUsers[indexOfEdit] = editUserObject;
                    setUsers(editingUsers);
                    setEditingUserId(NaN);
                    setErrors([]);
                    setView("Main");
                    setMembershipId(NaN);
                    setEmail("");
                    setUsername("");
                    setFirstName("");
                    setLastName("");
                    setPhone("");
                    setAddress("");
                    setCity("");
                    setState("");
                    setZipCode("");
                    setAuthorities([])

                }
            })
        }
    }


    //cancel button
    const cancelButton = () => {
        setEditingUserId(NaN);
        setErrors([]);
        setUsername("");
        setAuthorities([]);
        setFirstName("");
        setLastName("");
        setMembershipId(NaN);
        setEmail("");
        setPhone("");
        setView("Main")
    }

    //displaying errors
    const renderErrors = () => {
        return errors.map( error => <li key={error}>{error}</li>)
    }

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

    return ( 
        <>
        {(errors.length > 0) && (
            <div className="alert alert-danger">
                <ul>
                    {renderErrors()}
                </ul>
            </div>
        )}
        
        
        {view === "Main" &&(
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Email</th>
                </tr>
            </thead>
        )}
        </>
     );
}

export default AdminPage;