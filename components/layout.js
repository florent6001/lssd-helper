import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import navigation from "../data/navigation.json"
import Link from 'next/link';
import Image from 'next/image';

export default function Layout({ children }) {

    const [navbarIsOpen, setNavbarIsOpen] = useState(false);

    const [currentName, setCurrentName] = useState('')
    const [currentMatricule, setCurrentMatricule] = useState('')

    useEffect(() => {
        setCurrentName(localStorage.getItem('name'))
        setCurrentMatricule(localStorage.getItem('matricule'))

        if(localStorage.getItem('name') === null) {
            toast.error('Le nom de votre personnage n\'est pas renseigné, merci de le renseigner dans la page "Paramètres"');
        }

    }, [])

    return (
        <>
            <div className="flex h-screen bg-gray-300 transition duration-1000">
                <aside className={`transition duration-1000 z-[999] md:block w-64 overflow-y-auto border-r border-none bg-primary flex-shrink-0 md:mt-0 ${navbarIsOpen ? 'fixed inset-y-0 mt-16 md:relative' : 'hidden'}`}>
                    <div className="py-4 text-gray-400">
                        <Link href="/" className="text-lg font-bold text-secondary block text-center">
                          <Image src="/img/logo_LSSD.png" className="inline-block h-40" alt="Logo de LSSDHelper" width={150} height={50}/>
                            <h1 className='py-4'>LSSD Application Tools</h1>
                        </Link>
                        <ul className="mt-6">
                            {navigation.map((nav) => {
                                return (
                                    <div key={nav.category_name}>
                                        <h2 className='uppercase text-center block py-4'>{nav.category_name}</h2>
                                        {nav.childrens.map((item) => {
                                            return (
                                                <li className="relative px-6 py-2" key={item.title}>
                                                    <Link href={item.link} target={item.external_link ? '_blank' : ''} className={`inline-flex items-center w-full text-sm font-semibold text-secondary hover:text-gray-200 `}>
                                                        {item.icon ? <FontAwesomeIcon icon={item.icon} /> : ''}
                                                        {item.image ? <Image src={'/img/' + item.image + '.png'} height={50} width={50} alt={'image du ' + item.title} className="w-5" /> : ''}
                                                        <span className="pl-2">{item.title}</span>
                                                        {item.external_link ? <FontAwesomeIcon className='pl-2' icon={'up-right-from-square'} size="xs" /> : ''}
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </ul>
                    </div>
                </aside >
                <div className="flex flex-col flex-1">
                    <header className="z-10 py-4 transition duration-1000shadow-md bg-primary">
                        <div className="flex items-center justify-between h-full px-6 mx-auto text-purple-300">
                            <button className="p-1 -ml-1 mr-5 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple" aria-label="Menu" onClick={() => setNavbarIsOpen(!navbarIsOpen)}>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
                                </svg>
                            </button>
                            <div className="flex justify-between items-center flex-1 lg:mr-32">
                                <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
                                    <div className="absolute inset-y-0 flex items-center pl-2">
                                        <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
                                        </svg>
                                    </div>
                                    <input className="w-full pl-8 h-10 pr-2 text-sm border-0 rounded-md placeholder-gray-500 focus:shadow-outline-gray focus:placeholder-gray-600 bg-white text-gray-200 focus:border-purple-300 focus:outline-none form-input transition duration-1000" type="text" name="search" placeholder="Rechercher quelques chose, on sait pas quoi encore ?" aria-label="Barre de recherche" />
                                </div>
                                {currentName ?
                                    <p className="text-secondary font-semibold">{currentName} #{currentMatricule}</p>
                                    :
                                    ''
                                }
                            </div>
                        </div>
                    </header>
                    <main className="h-full overflow-y-auto w-full">
                        {children}
                    </main>
                </div>
            </div>
            <Toaster
                position='bottom-right'
                toastOptions={{
                    duration: 5000,
                }}
            />
        </>
    )
}
