const moment = require('moment')
import { useState } from "react";
import Result from "../../components/result";
import streets from "../../data/streets.json";
import districts from "../../data/districts.json";
import { useFieldArray, useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ShR49() {

  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      suspects: [{ name: "John Doe", status: "Arrêté" }]
    }
  })
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState('')
  const { fields, append, remove } = useFieldArray({
    control,
    name: "suspects"
  });

  const generateReport = data => {

    // Général
    let bbcode = `
      [block=1,10,black,white][font=Arial][color=black]

      [center][img]https://i.imgur.com/LEWTXbL.png[/img]

      [size=125][b]SHERIFF'S DEPARTMENT
      COUNTY OF LOS SANTOS[/b]
      [i]"A Tradition of Service Since 1850"[/i][/size]

      [size=130][b]Rapport d'incident
      SH-R-49[/b][/size][/center]
      [hr][/hr]

      [font=arial][color=black][size=105][b]I. Informations de dépôt[/b][/size]

      [al][b]Date et heure : [/b]${data.date}, ${data.time}
      [al][b]Localisation : [/b]${data.street}, ${data.district}
      [al][b]Déposé par : [/b]${localStorage.getItem('rank')} ${localStorage.getItem('name')}
      [al][b]Matricule : [/b] #${localStorage.getItem('matricule')}

      [font=arial][color=black][size=105][b]II. Suspect(s)[/b][/size]
    `
    // Gestion des suspects
    data['suspects'].forEach((suspect, index) => {
      bbcode += `
      [al][u]Suspect #${index + 1} - ${suspect.name}[/u]
      [al][b]Statut :[/b] ${suspect.status}[/al]
      `
    })

    // Informations complémentaires
    bbcode += `[font=arial][color=black][size=105][b]III. Informations complémentaires[/b][/size]`
    bbcode += `[al][b]Arme utilisée : [/b] ${data.weapon}
    [al][b]Nombre de munition : [/b] ${data.ammo}[/al]
    `

    bbcode += `
      [al][size=105][b]Adjoints impliqués (inclure uniquement les adjoints qui ont utilisé la force létale)[/b][/size]
      [al][list]Adjoint du shérif John Doe (#), [/list]
    `

    setResult(bbcode)
    setShowResult(true)
  }

  return (
    <div className="pb-16 py-12 mx-auto max-w-6xl px-5 text-white">
        <h1 className="text-4xl mb-10"><FontAwesomeIcon icon={'gun'} /> &nbsp; Rapport d&apos;incident SH-R-49</h1>
        {showResult ?
          <>
            <Result bbcode={result} />
            <div className="text-center">
              <button onClick={() => {setShowResult(false)}} className="bg-red-500 text-black font-bold px-5 py-2 my-4 rounded">Revenir en arrière</button>
            </div>
          </>
        :
        <form onSubmit={ handleSubmit(generateReport) }>
          <h2 className="mx-5 text-2xl pb-3">I. Informations de dépôt</h2>
          <div>
            <div className="inline-block mx-5">
              <label htmlFor="date">Date</label>
              <input required={true} {...register('date')} type="text" id="date" className="text-black" value={ moment().locale('fr').format('DD/MMM/YYYY').toUpperCase() } />
            </div>
            <div className="inline-block mx-5">
            <label htmlFor="time">Heure</label>
              <input required={true} {...register('time')} type="text" id="time" className="text-black" value={ moment().locale('fr').format('k:mm') } />
            </div>
            <div className="inline-block mx-5">
              <label htmlFor="district">Quartier</label>
              <input required={true} list="district" {...register('district')} />
              <datalist id="district">
                {districts.map((district) => {
                  return (
                    <option key={district} value={district}>{district}</option>
                  )
                })}
              </datalist>
            </div>
            <div className="inline-block mx-5">
              <label htmlFor="street">Rue</label>
              <input required={true} {...register('street')} list="street" />
              <datalist id="street">
                {streets.map((street) => {
                  return (
                    <option key={street} value={street}>{street}</option>
                  )
                })}
              </datalist>
            </div>
          </div>

          <h2 className="mx-5 text-2xl pb-3 pt-10">II. Suspects</h2>
          {fields.map((field, index) => {
            return (
              <div className="flex" key={index}>
                <div className="inline-block mx-5">
                  <label>Nom du suspect</label>
                  <input
                    type="text"
                    {...register(`suspects.${index}.name`)} 
                  />
                </div>
                <div className="inline-block mx-5">
                  <label>Status du suspect</label>
                  <select
                    {...register(`suspects.${index}.status`)}>
                    <option value="Arrêté">Arrêté</option>
                    <option value="Décédé">Décédé</option>
                    <option value="Libéré">Libéré</option>
                  </select>
                </div>
                {index == 0 ? 
                  <button type="button" onClick={() => append({ name: "John Doe", status: "Arrêté" })}>
                    <FontAwesomeIcon icon="plus" className="bg-green-500 rounded-full p-3 block" />
                  </button>
                : 
                  <button type="button" onClick={() => remove(index)}>
                    <FontAwesomeIcon icon="minus" className="bg-red-500 rounded-full p-3 block" />
                  </button>
                }
              </div>
            )
          })}

          <h2 className="mx-5 text-2xl pt-10 pb-3">III. Informations complémentaires</h2>
          <div>
            <div className="inline-block mx-5">
              <label htmlFor="weapon">Arme utilisée</label>
              <select required={true} {...register('weapon')} id="weapon" className="text-black">
                <option value="Sig Sauer">Sig Sauer</option>
                <option value="Glock 18">Glock 18</option>
              </select>
            </div>
            <div className="inline-block mx-5">
            <label htmlFor="ammo">Nombre de munitions</label>
              <input required={true} {...register('ammo')} type="text" id="ammo" className="text-black" />
            </div>
          </div>

          <div className="text-center w-full pt-5">
            <button type="submit" className="bg-secondary text-black font-bold px-6 py-2 rounded inline-block">Générer</button>
          </div>
        </form>
        }
    </div>
  )
}
