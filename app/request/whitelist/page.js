"use client";
import { checkWhitelist, whitelistUser } from "../../../utils";
import { useState } from "react";

export default function Whitelist() {
    const [formInput, setFormInput] = useState();
    const [isWhitelist, setIsWhitelist] = useState();

    async function checkWhitelistData() {
        const data = await checkWhitelist(formInput);
        setIsWhitelist(data);
    }

    async function whitelistUserData() {
        const data = await whitelistUser(formInput);
        setIsWhitelist(data);
    }

    return (
        <div>
            <div>
                <input
                    name="userAddress"
                    placeholder="wallet address"
                    onChange={(e) => {
                        setFormInput(e.target.value);
                    }}
                />
                <button onClick={whitelistUser}>Whitelist User</button>
            </div>
            <div>
                <input
                    name="operatorAddress"
                    placeholder="wallet address"
                    onChange={(e) => {
                        setFormInput(e.target.value);
                    }}
                />
                <button onClick={whitelistUser}>Make Whitelist Operator</button>
            </div>
        </div>
    );
}
