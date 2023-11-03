function UserCard({user, handleSelectUser}) {
    return (<>
        { user ? (
            <div className="user-card w-full flex cursor-pointer items-center px-3 py-3 border-b border-gray-400"
            onClick={() => handleSelectUser(user)}>
            <img className="h-16 w-16 object-cover rounded-full" src={user.profilePicture} alt={user.name} />
            <span className="text-[18px] ml-2">{user.name} </span>
            </div>
            
        ): (
            <h2>Loading...</h2>
        )}
        </>        
    )
}

export default UserCard;