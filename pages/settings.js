import toast from "react-hot-toast";
import Ranks from "../data/ranks.json";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Settings() {

    const { register, setValue, handleSubmit } = useForm();

    const saveCharacter = data => {
        localStorage.setItem('name', data.name)
        localStorage.setItem('rank', data.rank)
        localStorage.setItem('matricule', data.matricule)
        toast.success('Les informations de votre personnages ont bien été sauvegardées.')
    }

    useEffect(() => {
        setValue("name", localStorage.getItem('name'));
        setValue("rank", localStorage.getItem('rank'));
        setValue("matricule", localStorage.getItem('matricule'));
    }, [setValue]);

    return (
        <div className="pb-16 py-12 mx-auto max-w-6xl px-5 text-white">
            <h1 className="text-4xl pb-10">
                <FontAwesomeIcon icon={'gear'} />
                &nbsp; Paramètres
            </h1>
            <h2 className="text-2xl text-center pb-5"><FontAwesomeIcon icon="user" /> Paramètres du personnage</h2>
            <form onSubmit={handleSubmit(saveCharacter)}>
                <div className="md:flex text-center block w-full">
                    <div className="w-full md:w-2/5 md:mx-5 my-3">
                        <label htmlFor="name">Nom complet</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-black">
                                <FontAwesomeIcon icon={'user'} />
                            </div>
                            <input {...register('name')} type="text" className="w-full pl-10" placeholder="Prénom Nom" />
                        </div>
                    </div>
                    <div className="w-full md:w-2/5 md:mx-5 my-3">
                        <label htmlFor="name">Grade</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-black">
                                <FontAwesomeIcon icon={'id-badge'} />
                            </div>
                            <select {...register('rank')}  className="w-full pl-10">
                                <option value=""> -- Sélectionner un grade -- </option>
                                {Ranks.map((rank, index) => {
                                    return (
                                        <option key={rank} value={index}>
                                            {rank}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="w-full md:w-1/5 md:mx-5 my-3">
                        <label htmlFor="name">Matricule</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-black">
                                <FontAwesomeIcon icon={'user-tie'} />
                            </div>
                            <input {...register('matricule')}  type="text" className="text-black w-full border rounded h-14 p-3 my-3 inline-block pl-10" placeholder="####" />
                        </div>
                    </div>
                </div>
                <button type="submit" className="text-center mx-auto block bg-secondary text-black font-semibold p-3 rounded">Sauvegarder les informations de mon personnage</button>
            </form>
        </div>
    )
}
