"use client"

import { useTranslations } from "next-intl"

import { GenerateCorrection } from "@/components/generate-correction"

export default function Index() {
  const t = useTranslations("Index")
  return (
    <div className="container grid items-center gap-4 py-8">
      <div className="mx-auto mb-2 flex max-w-6xl flex-col items-start gap-2 text-center md:mb-8">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          {t("subtitle")}
        </h1>
      </div>
      <GenerateCorrection />
    </div>
  )
}
