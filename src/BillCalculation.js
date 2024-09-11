import { useEffect, useState } from "react";

export function BillCalculation({
    billOpen,
    selectedFriend,
    setDebtor,
    selfGlbBill,
    frenGlbBill,
    selected,
    setSelected,
    friend,
    setDebt,
    setFriend,
}) {
    const [bill, setBill] = useState("");
    const [billSelf, setBillSelf] = useState("");
    const [billFriend, setBillFriend] = useState("");
    const [payer, setPayer] = useState("");

    function handleBills() {
        selfGlbBill(billSelf);
        frenGlbBill(billFriend);
        setBill("");
        setBillSelf("");
        setBillFriend("");
        setPayer("");
        console.log(friend);
    }

    //Code to be revisited for further understanding
    useEffect(() => setBillFriend(bill - billSelf), [bill, billSelf]);

    //if you are to pay the bill
    function handleSelfBill(e) {
        setBillSelf(Number(e.target.value));
    }

    //if friend is to pay the bill
    function handleFriendBill(e) {
        //setBillFriend(Number(e.target.value));
    }

    if (!billOpen)
        return <div className="calculation-bill">Select a Friend to share</div>;

    return (
        <div className="calculation-bill">
            <h2>Split the bill with Cecilia</h2>

            <Bill bill={bill} onSetBill={setBill}>
                <span>💰</span>
                <p>Total bill</p>
            </Bill>

            <BillSelf billSelf={billSelf} onChangeBill={handleSelfBill}>
                <span>🧍🏿‍♂️</span>
                <p>Your bill share</p>
            </BillSelf>

            <BillFriend
                billFriend={billFriend}
                onChangeBill={handleFriendBill}
                selectedFriend={selectedFriend}
            >
                <span>👩🏾‍🤝‍🧑🏼</span>
                <p>{selectedFriend} share</p>
            </BillFriend>

            <Split payer={payer} onSetPayer={setPayer} />

            <div className="btn-container__bill">
                <div className="btn-box">
                    <button className="btn" onClick={handleBills}>
                        Split the bill
                    </button>
                </div>
            </div>
        </div>
    );
}
function Bill({ children, bill, onSetBill }) {
    return (
        <div className="bill-elements">
            {children}
            <input
                type="number"
                value={bill}
                onChange={(e) => onSetBill(Number(e.target.value))}
            />
        </div>
    );
}

function BillSelf({ children, billSelf, onChangeBill, selectedFriend }) {
    return (
        <div className="bill-elements">
            {children}

            <input
                type="number"
                value={billSelf}
                onChange={(e) => onChangeBill(e)}
            />
        </div>
    );
}

function BillFriend({ children, billFriend, onChangeBill }) {
    return (
        <div className="bill-elements">
            {children}
            <input
                type="number"
                value={billFriend}
                onChange={(e) => onChangeBill(e)}
            />
        </div>
    );
}

function Split({ payer, onSetPayer }) {
    return (
        <div className="bill-elements">
            <span>🤑</span>
            <p>Who is Paying</p>
            <select value={payer} onChange={(e) => onSetPayer(e.target.value)}>
                <option value="you">You</option>
                <option value="friend">Friend</option>
            </select>
        </div>
    );
}
