"use client"

import React, { useEffect, useRef } from "react"

export function GeneratedCorrectionContent({ correction }: { correction: string }) {
  const correctionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const scrollToCorrection = () => {
      if (correctionRef.current !== null) {
        correctionRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }

    scrollToCorrection()
  }, [correction])

  return (
    <div className="mx-auto p-4">
      <div className="transition">
        <p
          className="p-2 font-medium md:text-base"
          dangerouslySetInnerHTML={{ __html: correction }}
          ref={correctionRef}
        />
      </div>
    </div>
  )
}
