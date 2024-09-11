import { useState } from "react";

// const friends = [
//     {
//         name: "John Doe",
//         image: "https://mighty.tools/mockmind-api/content/human/65.jpg",
//         balance: 0,
//         id: "kevin",
//     },
//     {
//         name: "Cecilia Thuku",
//         image: "https://mighty.tools/mockmind-api/content/human/44.jpg",
//         balance: -1,
//         id: "cecilia",
//     },
//     {
//         name: "Lenox Njogu",
//         image: "https://mighty.tools/mockmind-api/content/human/57.jpg",
//         balance: 1,
//         id: "lenox",
//     },
// ];

export default function App() {
    const [friends, setFriends] = useState([]);
    const [openBill, setOpenBill] = useState(false);

    return (
        <div className="app">
            <FriendsList friends={friends} onBill={setOpenBill} />
            <SplitBill openBill={openBill} />
            <AddFriend onSetFriend={setFriends} />
        </div>
    );
}

function FriendsList({ friends, onBill }) {
    return (
        <div>
            <ul className="friends">
                {friends.map((friend, idx) => (
                    <Friend
                        friend={friend}
                        key={friend.id}
                        num={friend.id}
                        onBill={onBill}
                    />
                ))}
            </ul>
        </div>
    );
}

function Friend({ friend, onBill }) {
    function handleSelection() {
        onBill((bill) => !bill);
    }

    return (
        <li className="friend">
            <img src={friend.image} alt={friend.name} className="img" />
            <div className="profile-data">
                <h2>{friend.name}</h2>
                <p>
                    {friend.balance === 0 && `You and ${friend.name} are even`}
                </p>
                <p className="owed">
                    {friend.balance < 0 &&
                        `${friend.name} owes you ${friend.balance} £`}
                </p>
                <p className="owe">
                    {friend.balance > 0 &&
                        `You owe ${friend.name} ${friend.balance} £`}
                </p>
            </div>
            <button className="btn" onClick={handleSelection}>
                Select
            </button>
        </li>
    );
}

function AddFriend({ onSetFriend }) {
    const [isOpen, setIsopen] = useState(false);
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");

    function toggleForm() {
        setIsopen((isOpen) => !isOpen);
    }

    function createFriend(e) {
        e.preventDefault();

        if (!name || !url) return;
        const newFriend = { name, url, balance: 0, id: crypto.randomUUID() };
        onSetFriend((friends) => [...friends, newFriend]);

        setName("");
        setUrl("");
    }

    return (
        <div>
            {isOpen && (
                <form className="form" onSubmit={(e) => createFriend(e)}>
                    <div className="form-el">
                        <label>Friend name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-el">
                        <label>Image URL</label>
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                    <div className="btn-container">
                        <button className="btn">Add</button>
                    </div>
                </form>
            )}

            <div className="btn-container">
                <button className="btn" onClick={toggleForm}>
                    {!isOpen ? `Add friend` : `close`}
                </button>
            </div>
        </div>
    );
}

function SplitBill({ openBill }) {
    return (
        <div className="form">
            <h1>Split the Bill</h1>
            {openBill && (
                <form>
                    <div className="form-el ">
                        <label>Total bill</label>
                        <input type="number" />
                    </div>
                    <div className="form-el ">
                        <label>Your share</label>
                        <input type="number" />
                    </div>
                    <div className="form-el ">
                        <label>Friend share</label>
                        <input type="number" />
                    </div>
                    <div className="form-el ">
                        <label>Who is paying?</label>
                        <select>
                            <option value="you">You</option>
                            <option value="friend">Friend</option>
                        </select>
                    </div>
                    <div className="btn-container">
                        <button className="btn">Add friend</button>
                    </div>
                </form>
            )}
        </div>
    );
}
