"use client"

import React, { useState } from "react"
import { Delete } from "lucide-react"
import { useTranslations } from "next-intl"

import { defaultValues, type FormData } from "@/types/types"
import { generateCorrection } from "@/lib/generate-correction"
import { generatePrompt } from "@/lib/generate-prompt"
import { cn } from "@/lib/utils"
import { CorrectionForm } from "@/components/form/correction-form"
import { GeneratedCorrectionContent } from "@/components/generated-correction-content"

import { CopyButton } from "@/components/copy-button"
import { Button } from "@/components/ui/button"

export function GenerateCorrection() {
  const [generatedCorrection, setGeneratedCorrection] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [correctionVisible, setCorrectionVisible] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<FormData>(defaultValues)
  const t = useTranslations("Form")

  const onSubmit = async (values: FormData, e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setGeneratedCorrection("")

    const prompt = generatePrompt(values)
    const response = await generateCorrection(prompt)

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const data = response.body
    if (!data) {
      return
    }

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      const formattedChunk = chunkValue.replace(/\n/g, "<br>")
      setGeneratedCorrection((prev) => prev + formattedChunk)
      setCorrectionVisible(true)
      setLoading(false)
    }
  }

  const handleClear = () => {
    setGeneratedCorrection("")
    const inputElement = document.getElementById(
      "textarea-form-field"
    ) as HTMLTextAreaElement

    if (inputElement) {
      inputElement.value = ""
    }
  }

  return (
    <div
      className={cn("mx-auto w-full space-x-2", {
        "md:flex": loading || correctionVisible,
        "max-w-2xl": !loading && !correctionVisible,
      })}
    >
      <div
        className={cn("w-full justify-around", {
          "md:flex md:w-1/2": loading || correctionVisible,
          "": !loading && !correctionVisible,
        })}
      >
        <CorrectionForm onSubmit={onSubmit} isLoading={loading} />
      </div>

      {loading ||
        (correctionVisible && (
          <div className="md:w-1/2">
            <div className="inline-flex space-x-4">
              <CopyButton value={generatedCorrection.toString()} />
              <Button variant="destructive" onClick={handleClear}>
                <Delete className="mr-2 h-4 w-4" />
                {t("clearbutton")}
              </Button>
            </div>
            <div className="my-4 rounded-md border">
              {generatedCorrection && (
                <GeneratedCorrectionContent correction={generatedCorrection} />
              )}
            </div>
          </div>
        ))}
    </div>
  )
}
