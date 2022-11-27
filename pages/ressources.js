import React from "react";
import ressources from "../data/ressources.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const copyText = (id) => {
    navigator.clipboard.writeText(document.getElementById(id).innerHTML)
}

export default function Ressources() {
    return (
        <div className="pb-16 py-12 mx-auto max-w-6xl px-5 text-white">
            <h1 className="text-4xl pb-10">
                <FontAwesomeIcon icon={'book'} />
                &nbsp; Ressources utiles
            </h1>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-10 text-center text-black font-semibold">
                {ressources.map(({type, title, text, id}) => {
                    return (
                        <div key={title} className="mx-auto w-full rounded p-5 bg-white">
                            <h2 className="text-xl text-left">{title}</h2>
                            {type === 'copy' ?
                                <>
                                    <textarea disabled className="w-full h-32 my-3 border rounded p-3" id={id} defaultValue={text}></textarea>
                                    <button className="bg-primary px-5 py-3 text-white rounded" onClick={() => copyText(id)}>
                                        Copier le texte
                                    </button>
                                </>
                                :
                                ''
                            }
                        </div>
                    )
                })}
            </section>
        </div>
    )
}
