const moment = require('moment')
import { useState } from "react";
import { useForm } from "react-hook-form";
import Result from "../../components/result";
import streets from "../../data/streets.json";
import districts from "../../data/districts.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ShR49() {

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

    [al][b]Date et heure : [/b]^^date^^, ^^time^^
    [al][b]Localisation : [/b]^^street^^, ^^district^^
    [al][b]Déposé par : [/b]^^rank^^ ^^name^^
    [al][b]Matricule : [/b] #^^matricule^^

    [font=arial][color=black][size=105][b]II. Suspect(s)[/b][/size]

    [al][u]Suspect #1 - Peanuts Cacahuêtes[/u]
    [al][b]Statut :[/b] Arrested[/al]

    [font=arial][color=black][size=105][b]III. Informations complémentaires[/b][/size]
    [al][b]Arme utilisée : [/b] Sig Sauer
    [al][b]Nombre de munition : [/b] 5[/al]


    [al][size=105][b]Adjoints impliqués (inclure uniquement les adjoints qui ont utilisé la force létale)[/b][/size]
    [al][list]Adjoint du shérif John Doe (#), [/list]

    [al][size=105][b]Tiers personnes (inclure uniquement les employés d'autres départements ou civils connus)[/b][/size][/al]
    [al][list]Officier de police John Doe (#), [/list][/al]
    [font=arial][color=black][size=105][b]IV. Déclarations et preuves[/b][/size]

    [al][size=105][b]Récit des faits[/b][/size][/al]
    [thread]Il a tiré, l'adjoint Doe l'a neutralisé.[/thread][/al]
    [al][size=105][b]Éléments de preuves[/b][/size][/al]

    [spoiler=Dashcam/bodycam][/spoiler]
    [spoiler=Description #1]efefefefe[/spoiler]
    [spoiler=Description #2]efef[/spoiler]
    [spoiler=Photographie #1][img]IMAGE[/img][/spoiler]
    [spoiler=Photographie #2][img]IMAGE[/img][/spoiler][/block]
  `

  const { register, handleSubmit } = useForm()
  const fields = ['date', 'time', 'street', 'district']
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState('')

  const generateReport = data => {
    console.log(data)

    fields.forEach(element => {
      bbcode = bbcode.replace('^^' + element + '^^', data[element])
    });

    bbcode = bbcode.replace('^^rank^^', localStorage.getItem('rank'))
    bbcode = bbcode.replace('^^name^^', localStorage.getItem('name'))
    bbcode = bbcode.replace('^^matricule^^', localStorage.getItem('matricule'))
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
          <h2 className="mx-5 text-2xl pb-3">Section général</h2>
          <div>
            <div className="inline-block mx-5">
              <label htmlFor="date">Date</label>
              <input {...register('date')} type="text" id="date" className="text-black" value={ moment().locale('fr').format('DD/MMM/YYYY').toUpperCase() } />
            </div>
            <div className="inline-block mx-5">
            <label htmlFor="time">Heure</label>
              <input {...register('time')} type="text" id="time" className="text-black" value={ moment().locale('fr').format('k:mm') } />
            </div>
          </div>

          <h2 className="mx-5 text-2xl pb-3 pt-10">Localisation</h2>
          <div>
            <div className="inline-block mx-5">
              <label htmlFor="district">Quartier</label>
              <input list="district" {...register('district')} />
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
              <input {...register('street')} list="street" />
              <datalist id="street">
                {streets.map((street) => {
                  return (
                    <option key={street} value={street}>{street}</option>
                  )
                })}
              </datalist>
            </div>
          </div>

          <div className="text-center w-full">
            <button type="submit" className="bg-secondary text-black font-bold px-6 py-2 rounded inline-block">Générer</button>
          </div>
        </form>
        }
    </div>
  )
}
