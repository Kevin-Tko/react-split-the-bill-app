//import useState from react
import { useState } from "react";

export function AddFriendForm({ onSetFriend }) {
    //Local states handling name input and url input fields as controlled elements
    const [name, setName] = useState("");
    const [url, setUrl] = useState(
        "https://mighty.tools/mockmind-api/content/human/44.jpg"
    );

    //Local state toggling the open and closed status of the add friend form component
    const [isOpen, setIsOpen] = useState(false);

    //function handling the toggling form visibility, preventing default form behaviour to refresh
    //confirming the name and url states are not empty, creation of a new friend object,
    //setting the global friend state and clearing form input fields
    function handleAddFriend(e) {
        setIsOpen(!isOpen);
        e.preventDefault();
        if (!name || !url) return;
        const newFriend = { name, url, balance: 0, id: crypto.randomUUID() };
        onSetFriend((fr) => [...fr, newFriend]);
        setName("");
        setUrl("");
        console.log(newFriend);
    }

    return (
        <form className="add-friend">
            {/* only render Name and ImageUrl components when Isopen is true */}
            {isOpen && <Name name={name} onSetName={setName} />}
            {isOpen && <ImageUrl url={url} onSetUrl={setUrl} />}

            {/* Buttom is always rendered */}
            <Button onAddFriend={handleAddFriend}>Add friend</Button>
        </form>
    );
}

function Name({ name, onSetName }) {
    return (
        <div className="new-friend__name">
            <span>👩🏾‍🤝‍🧑🏼</span>
            <label>Friend name</label>
            <input
                type="text"
                value={name}
                onChange={(e) => onSetName(e.target.value)}
            />
        </div>
    );
}

function ImageUrl({ url, onSetUrl }) {
    return (
        <div className="new-friend__img">
            <span>📷</span>
            <label>Image URL</label>
            <input
                placeholder="https://mighty.tools/mockmind-api/content/human/44.jpg"
                type="url"
                value={url}
                onChange={(e) => onSetUrl(e.target.value)}
            />
        </div>
    );
}

function Button({ children, onAddFriend }) {
    return (
        <div className="btn-container">
            <div className="btn-box">
                <button className="btn" onClick={(e) => onAddFriend(e)}>
                    {children}
                </button>
            </div>
        </div>
    );
}
