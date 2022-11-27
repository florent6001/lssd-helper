import React from "react";
const changelogs = require("../data/changelogs.json");
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Changelogs() {
    return (
        <div className="pb-16 py-12 mx-auto max-w-6xl px-5 text-white">
            <h1 className="text-4xl mb-10"><FontAwesomeIcon icon={'rotate'} /> &nbsp; Changelogs</h1>
            <div className="grid grid-cols-1 gap-5">
                {changelogs.reverse().map((changelog) => {
                    return (
                        <div key={changelog.title} className="w-full bg-white rounded text-black p-5">
                            <h2 className="text-2xl font-semibold pb-3">{changelog.title}</h2>
                            <p>{changelog.description}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
