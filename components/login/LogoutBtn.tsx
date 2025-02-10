'use client';

import { signOut } from "next-auth/react";

export default function LogoutBtn() {
    return (
        <div>
            <button onClick={() => signOut()}>
                SAIR
            </button>
        </div>
    );
}