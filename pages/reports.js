import React from "react";
import Link from "next/link";
import ReportType from "../data/reports_type.json"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Reports() {
    return (
        <div className="pb-16 py-12 mx-auto max-w-6xl px-5 text-white">
            <h1 className="text-4xl pb-10">
                <FontAwesomeIcon icon="file" />
                &nbsp; Générateur de rapport
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {ReportType.map((report) => {
                    return (
                      <Link key={report.title} target={report.external_link ? '_blank' : ''} href={report.link} className="mx-auto w-full text-center rounded p-5 text-primary bg-white font-semibold">
                          <FontAwesomeIcon icon={report.icon} size="5x" className="inline-block" />
                          <h2 className="text-xl pt-5" dangerouslySetInnerHTML={{ __html: report.title }}>
                          </h2>
                      </Link>
                    )
                })}
            </div>
        </div>
    )
}
