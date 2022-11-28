const moment = require('moment')
import { useEffect, useState } from "react";
import Result from "../../components/result";
import streets from "../../data/streets.json";
import districts from "../../data/districts.json";
import { useFieldArray, useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ranks from "../../data/ranks.json"

export default function ShR49() {

  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      suspects: [{ name: "John Doe", status: "Arrêté" }],
    }
  })

  const { fields: suspectFields, append: suspectAppend, remove: suspectRemove } = useFieldArray({
    control,
    name: "suspects"
  });

  const { fields: officerFields, append: officerAppend, remove: officerRemove } = useFieldArray({
    control,
    name: "officers"
  });

  const { fields: peopleFields, append: peopleAppend, remove: peopleRemove } = useFieldArray({
    control,
    name: "peoples"
  });

  const { fields: dashcamFields, append: dashcamAppend, remove: dashcamRemove } = useFieldArray({
    control,
    name: "dashcams"
  });

  const { fields: screenshotFields, append: screenshotAppend, remove: screenshotRemove } = useFieldArray({
    control,
    name: "screenshots"
  });

  const { fields: descriptionFields, append: descriptionAppend, remove: descriptionRemove } = useFieldArray({
    control,
    name: "descriptions"
  });

  const [name, setName] = useState('')
  const [rank, setRank] = useState('')
  const [matricule, setMatricule] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState('')

  useEffect(() => {
    setName(localStorage.getItem('name'))
    setRank(localStorage.getItem('rank'))
    setMatricule(localStorage.getItem('matricule'))
  })

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

    if(data.officers.length > 0) {
      bbcode += `
      [al][size=105][b]Adjoints impliqués (inclure uniquement les adjoints qui ont utilisé la force létale)[/b][/size][/al]
      `

      data.officers.forEach((officer) => {
        bbcode += `[al][list]${officer.rank} ${officer.name} (${officer.matricule}), [/list]
      `
      })
    }

    if(data.peoples.length > 0) {
      bbcode += `
      [al][size=105][b]Tiers personnes (inclure uniquement les employés d'autres départements ou civils connus)[/b][/size][/al]
      `

      data.peoples.forEach((people) => {
        bbcode += `[al][list]${people.name} ${people.job}, [/list][/al]
      `
      })
    }

    bbcode += `
      [font=arial][color=black][size=105][b]IV. Déclarations et preuves[/b][/size]
      [al][size=105][b]Récit des faits[/b][/size][/al]
      [thread]${data.description}[/thread]
      [al][size=105][b](( /do des dashcams et bodycam ))[/b][/size][/al]
      [thread][color=#6b21a8]${data.do}[/color][/thread][/al]
    `

    data.dashcams.forEach((dashcam) => {
      bbcode += `[spoiler=Dashcam/bodycam]${dashcam.link}[/spoiler]
    `
    })

    bbcode += `
    [al][size=105][b]Éléments de preuves[/b][/size][/al]
    `
    
    bbcode += `[al][b]Casier de preuves n° : ${data.num_casier}[/b]
    [al][b]Lieu du dépôt : [/b] ${data.lieu_casier}[/al]\n\n`

    if(data.descriptions.length > 0 || data.screenshots.length > 0) {

      data.descriptions.forEach((description, index) => {
        bbcode += `[spoiler=Description #${index + 1}]${description.text}[/spoiler]
      `
      })

      data.screenshots.forEach((screenshot, index) => {
        bbcode += `[spoiler=Photographie #${index + 1}][img]${screenshot.link}[/img][/spoiler]
      `
      })

      
    }

    bbcode += `[/block]`

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
              <label htmlFor="name">Nom prénom</label>
              <input required={true} {...register('name')} type="text" id="name" className="text-black" defaultValue={name} />
            </div>
            <div className="inline-block mx-5">
              <label htmlFor="rank">Rang</label>
              <input required={true} {...register('rank')} type="text" id="rank" className="text-black" defaultValue={rank} />
            </div>
            <div className="inline-block mx-5">
              <label htmlFor="matricule">Matricule</label>
              <input required={true} {...register('matricule')} type="text" id="matricule" className="text-black" defaultValue={matricule} />
            </div>
          </div>
          <div>
            <div className="inline-block mx-5">
              <label htmlFor="date">Date</label>
              <input required={true} {...register('date')} type="text" id="date" className="text-black" defaultValue={ moment().locale('fr').format('DD/MMM/YYYY').toUpperCase() } />
            </div>
            <div className="inline-block mx-5">
            <label htmlFor="time">Heure</label>
              <input required={true} {...register('time')} type="text" id="time" className="text-black" defaultValue={ moment().locale('fr').format('k:mm') } />
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
          {suspectFields.map((field, index) => {
            return (
              <div className="flex" key={index}>
                <div className="inline-block mx-5">
                  <input
                    type="text"
                    {...register(`suspects.${index}.name`)} 
                  />
                </div>
                <div className="inline-block mx-5">
                  <select
                    {...register(`suspects.${index}.status`)}>
                    <option value="Arrêté">Arrêté</option>
                    <option value="Décédé">Décédé</option>
                    <option value="Libéré">Libéré</option>
                  </select>
                </div>
                {index !== 0 ?
                  <button type="button" onClick={() => suspectRemove(index)}>
                    <FontAwesomeIcon icon="minus" className="bg-red-500 rounded-full p-3 block" />
                  </button>
                : 
                  ''  
                } 
              </div>
            )
          })}
          <button type="button" className="bg-secondary py-3 px-5 mx-5 rounded text-black font-bold" onClick={() => suspectAppend({ name: "John Doe", status: "Arrêté"})}>
            Ajouter un suspect
          </button>

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
          <div>
            <div className="inline-block">
              <h2 className="pt-5 pb-5 mx-5">
                Adjoints impliqués (inclure uniquement les adjoints qui ont utilisé la force létale) 
              </h2>
              {officerFields.map((field, index) => {
                return (
                  <div className="flex" key={index}>
                    <div className="inline-block mx-5">
                      <input
                        type="text"
                        {...register(`officers.${index}.name`)} 
                      />
                    </div>
                    <div className="inline-block mx-5">
                      <select {...register(`officers.${index}.rank`)}>
                        {ranks.map(rank => {
                          return (
                            <option key={rank} value={rank}>{rank}</option>
                          )
                        })}
                      </select>
                    </div>
                    <div className="inline-block mx-5">
                      <input
                        type="text"
                        {...register(`officers.${index}.matricule`)} 
                      />
                    </div>
                    <button type="button" onClick={() => officerRemove(index)}>
                      <FontAwesomeIcon icon="minus" className="bg-red-500 rounded-full p-3 block" />
                    </button>
                  </div>
                  
                )
              })}
              <button type="button" className="bg-secondary py-3 px-5 mx-5 rounded text-black font-bold" onClick={() => officerAppend({ name: "John Doe", rank: "Adjoint du shérif (généraliste)", matricule: "#1234" })}>
                Ajouter un adjoint
              </button>
            </div>
          </div>

          <div>
            <div className="inline-block">
              <h2 className="pt-5 pb-5 mx-5">
              Tiers personnes (inclure uniquement les employés d&apos;autres départements ou civils connus)
              </h2>
              {peopleFields.map((field, index) => {
                return (
                  <div className="flex" key={index}>
                    <div className="inline-block mx-5">
                      <input
                        type="text"
                        {...register(`peoples.${index}.name`)} 
                      />
                    </div>
                    <div className="inline-block mx-5">
                      <select {...register(`peoples.${index}.job`)}>
                        <option value='Département de police (LSPD)'>Département de police (LSPD)</option>
                        <option value="Département de secours (LSFD)">Département de secours (LSFD)</option>
                        <option value='Bureau du procureur'>Bureau du procureur</option>
                        <option value='Agent fédéral (FBI)'>Agent fédéral (FBI)</option>
                        <option value='Personne civile'>Personne civile</option>
                      </select>
                    </div>
                    <button type="button" onClick={() => peopleRemove(index)}>
                      <FontAwesomeIcon icon="minus" className="bg-red-500 rounded-full p-3 block" />
                    </button>
                  </div>
                  
                )
              })}
              <button type="button" className="bg-secondary py-3 px-5 mx-5 rounded text-black font-bold" onClick={() => peopleAppend({ name: "John Doe", job: "Civil" })}>
                Ajouter un témoin
              </button>
            </div>
          </div>

          <div>
            <h2 className="pt-5 pb-5 mx-5">
            IV. Déclarations et preuves
            </h2>
            <div className="mx-5">
              <label htmlFor="description">Récit des faits</label>
              <textarea required {...register('description')} id="description" rows="5" className="w-full rounded text-black p-3"></textarea>
            </div>

            <div className="mx-5 pt-5">
              <label htmlFor="do">(( /do dashcam/bodycam ))</label>
              <textarea required {...register('do')} id="do" rows="5" className="w-full rounded text-purple-800 p-3"></textarea>
            </div>

            <div>
              <button type="button" className="bg-secondary py-3 px-5 mx-5 my-3 rounded text-black font-bold" onClick={() => dashcamAppend({ 'link': 'https://youtube.com/'})}>
                (( Ajouter une vidéo ))
              </button>

              {dashcamFields.map((field, index) => {
                return (
                  <div key={index} className="inline-block">
                    <div className="flex" key={index}>
                      <div className="inline-block justify-center mx-5">
                        <input
                          type="text"
                          {...register(`dashcams.${index}.link`)} 
                        />
                      </div>
                      <button type="button" onClick={() => dashcamRemove(index)}>
                        <FontAwesomeIcon icon="minus" className="bg-red-500 rounded-full p-3 block" />
                      </button>
                    </div>
                  </div>
                )
              })}
              </div>
          </div>

          <div>
            <h2 className="pt-5 pb-5 mx-5">
            Casier de preuves
            </h2>
            <div>
              <div className="inline-block mx-5">
                <input type="text" {...register('num_casier')} />
              </div>
              <div className="inline-block mx-5">
                <select
                  {...register(`lieu_casier`)}>
                  <option value="Station du shérif de Davis">Station du shérif de Davis</option>
                  <option value="Division d&apos;enquête de Davis">Division d&apos;enquête de Davis</option>
                  <option value="TTCF">TTCF</option>
                  <option value="Station du shérif de Paleto Bay">Station du shérif de Paleto Bay</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h2 className="pt-5 pb-5 mx-5">
            Élement de preuves
            </h2>
            <div>
              <button type="button" className="bg-secondary py-3 px-5 mx-5 rounded text-black font-bold" onClick={() => descriptionAppend()}>
                Ajouter une description
              </button>
              <button type="button" className="bg-secondary py-3 px-5 mx-5 rounded text-black font-bold" onClick={() => screenshotAppend({ 'link': 'https://imgur.com/'})}>
                Ajouter une photographie
              </button>
            </div>
          </div>

          {descriptionFields.map((field, index) => {
            return (
              <div key={index}>
                <label className="pt-5 mx-5">Description #{index +1}</label>
                <div className="flex" key={index}>
                  <div className="inline-block justify-center mx-5 w-full">
                    <textarea {...register(`descriptions.${index}.text`)} rows="10" className="w-full mt-5 text-black"></textarea>
                  </div>
                  <button type="button" onClick={() => descriptionRemove(index)}>
                    <FontAwesomeIcon icon="minus" className="bg-red-500 rounded-full p-3 block" />
                  </button>
                </div>
              </div>
            )
          })}

          {screenshotFields.map((field, index) => {
            return (
              <div key={index}>
                <label className="pt-5 mx-5">Dashcam #{index +1}</label>
                <div className="flex" key={index}>
                  <div className="inline-block justify-center mx-5 ">
                    <input
                      type="text"
                      {...register(`screenshots.${index}.link`)} 
                    />
                  </div>
                  <button type="button" onClick={() => screenshotRemove(index)}>
                    <FontAwesomeIcon icon="minus" className="bg-red-500 rounded-full p-3 block" />
                  </button>
                </div>
              </div>
            )
          })}

          <div className="text-center w-full pt-10">
            <button type="submit" className="bg-secondary text-black font-bold px-6 py-2 rounded inline-block">Générer le rapport</button>
          </div>
        </form>
        }
    </div>
  )
}
