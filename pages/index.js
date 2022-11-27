import React from "react";
import Link from "next/link";
import dashboards from '../data/dashboard.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Dashboard() {
    return (
        <div className="pb-16 py-12 mx-auto max-w-6xl px-5 text-white">
            <h1 className="text-4xl pb-10">
                <FontAwesomeIcon icon={'home'} />
                &nbsp; Tableau de bord
            </h1>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-10 text-center text-black font-semibold">
                {dashboards.map((dashboard) => {
                    return (
                      <Link key={dashboard.title} href={dashboard.link} target={dashboard.external_link ? 'blank': '' } className="mx-auto w-full rounded p-5 bg-white">
                          <FontAwesomeIcon icon={dashboard.icon} size="5x" className="inline-block text-primary" />
                          <h2 className="text-xl py-5">
                              {dashboard.title}
                              {dashboard.external_link ? <FontAwesomeIcon className='pl-2' icon={'up-right-from-square'} size="xs" /> : ''}
                          </h2>
                          <p>{dashboard.text}</p>
                      </Link>
                    )
                })}
            </section>
        </div>
    )
}
