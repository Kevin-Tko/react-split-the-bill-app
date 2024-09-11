import { useState } from "react";
import { AddFriendForm } from "./AddFriendForm";
import { FriendsList } from "./FriendsList";
import { BillCalculation } from "./BillCalculation";

export default function App() {
    return <SplitBillContainer />;
}

function SplitBillContainer() {
    const [friend, setFriend] = useState([]);
    const [debtor, setDebtor] = useState("");
    const [debt, setDebt] = useState(0);
    const [billOpen, setBillOpen] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState("");
    const [globalSelfBill, setGlobalSelfBill] = useState("");
    const [globalFrenBill, setGlobalFrenBill] = useState("");
    const [selected, setSelected] = useState(null);

    return (
        <div className="container">
            <div className="container-friends">
                <FriendsList
                    friend={friend}
                    debtor={debtor}
                    onBillOpen={setBillOpen}
                    billOpen={billOpen}
                    setSelectedFriend={setSelectedFriend}
                    globalSelfBill={globalSelfBill}
                    globalFrenBill={globalFrenBill}
                    selected={selected}
                    setSelected={setSelected}
                />
                <AddFriendForm
                    onSetFriend={setFriend}
                    friend={friend}
                    debtor={debtor}
                    debt={debt}
                />
                <CloseButton />
            </div>
            <BillCalculation
                billOpen={billOpen}
                selectedFriend={selectedFriend}
                setDebtor={setDebtor}
                selfGlbBill={setGlobalSelfBill}
                frenGlbBill={setGlobalFrenBill}
                selected={selected}
                setSelected={setSelected}
                friend={friend}
                setDebt={setDebt}
                setFriend={setFriend}
            />
        </div>
    );
}

function CloseButton() {
    return <div className="close-btn">Close button</div>;
}

export function Button({ children }) {
    return (
        <div className="btn-box">
            <button className="btn">{children}</button>
        </div>
    );
}
