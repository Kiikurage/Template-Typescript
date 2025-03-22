import { useEffect } from "react";
import { APIClient } from "@app/extension/src/APIClient";

export function App() {
    useEffect(() => {
        APIClient.getUser
            .query({id: Math.random().toString(36).substring(2)})
            .then((user) => console.log(user));
    }, []);

    return (
        <div css={{position: "fixed", inset: 0}}>
            <h1>Hello World</h1>
        </div>
    );
}
