"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { FieldValues } from "react-hook-form"

import { FormControl, FormField, FormItem } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectFormFieldProps {
  form: FieldValues
  name: string
}

const languages = [
  { value: "it" },
  { value: "en" },
  { value: "es" },
  { value: "de" },
  { value: "fr" },
] as const

export function SelectFormField({ form, name }: SelectFormFieldProps) {
  const t = useTranslations("SelectFormField")

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger aria-label="language">
                <SelectValue placeholder="Select your language" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem value={language.value}>
                  <Image
                    alt="Country Flag"
                    className="mr-2 inline-flex rounded-full"
                    src={`/${language.value}.svg`}
                    width={18}
                    height={18}
                  />
                  {t(`${language.value}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  )
}
