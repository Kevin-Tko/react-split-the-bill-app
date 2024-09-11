import { useState } from "react";

export function FriendsList({
    friend,
    onBillOpen,
    setSelectedFriend,
    billOpen,
    selected,
    setSelected,
    debtor,
}) {
    //Guard to ensure if the friend prop/global state is empty execution is stopped
    if (friend.length === 0) return;
    console.log(friend);
    return (
        <div className="friends">
            {friend.map((fren, idx) => (
                <Friend
                    item={fren}
                    key={idx}
                    num={idx + 1}
                    setBillOpen={onBillOpen}
                    billOpen={billOpen}
                    selected={selected}
                    setSelected={setSelected}
                    setSelectedFriend={setSelectedFriend}
                    debtor={debtor}
                />
            ))}
        </div>
    );
}

function Friend({
    item,
    setBillOpen,
    selected,
    setSelected,
    num,
    setSelectedFriend,
    billOpen,
    debtor,
}) {
    function handleClick() {
        setSelected(num !== selected ? num : null);
    }

    return (
        <div className="friend">
            <ProfilePhoto friend={item} />

            <ProfileData
                friend={item}
                debtor={debtor}
                selected={selected}
                num={num}
            />

            <Button
                onSelection={handleClick}
                setBillOpen={setBillOpen}
                billOpen={billOpen}
                setSelectedFriend={setSelectedFriend}
                friend={item}
                selected={selected}
                num={num}
            ></Button>
        </div>
    );
}

//Profile photo image
function ProfilePhoto({ friend }) {
    return (
        <div>
            <img src={friend.url} alt="profile pic" className="profile-img" />
        </div>
    );
}

//Profile Data component
function ProfileData({ friend, debtor, selected, num }) {
    return (
        <div className="profile-data">
            <h2 className="friend-name">{friend.name}</h2>
            <p className="profile-msg">
                {friend.balance === 0 && `You and ${friend.name} are even`}
                {friend.balancet < 0 &&
                    `You owe ${friend.name} ${friend.debt}}`}
                {friend.balance > 0 &&
                    `${friend.name} owes You ${friend.debt}}`}
                {/* {num === selected
                    ? `${debtor} and ${friend.name} are not even`
                    : `You and ${friend.name} are even`} */}
            </p>
        </div>
    );
}

//Profile Data component
function Button({
    onSelection,
    setBillOpen,
    setSelectedFriend,
    friend,
    selected,
    num,
    billOpen,
}) {
    const [buttonTxt, setButtonTxt] = useState(false);

    return (
        <div className="btn-box">
            <button
                className="btn"
                onClick={() => {
                    onSelection();
                    setButtonTxt(!buttonTxt);
                    setBillOpen(!billOpen);
                    setSelectedFriend(friend.name.split(" ").at(0));
                }}
            >
                {!buttonTxt ? `Select` : `Close`}
            </button>
        </div>
    );
}
