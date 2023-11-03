import UserCard from "./UserCard";


function LeftBar({ users, handleSelectUser }) {
    return(
        <div className="chat-list w-1/4  overflow-y-scroll border-r border-gray-400">
            {users.map((user) => (
                user ? (
                    <UserCard key={user._id} user={user}
                     onClick={() => handleSelectUser(user)} handleSelectUser={handleSelectUser} />
                ) : null
            ))}
        </div>
    )
}

export default LeftBar;