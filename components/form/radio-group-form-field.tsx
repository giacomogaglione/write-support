"use client"

import { useTranslations } from "next-intl"
import { FieldValues } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Icons } from "@/components/icons"

interface RadioGroupOption {
  value: string
  icon: any
}

interface RadioGroupFormFieldProps {
  form: FieldValues
  name: string
  options: RadioGroupOption[]
}

export const options: RadioGroupOption[] = [
  { value: "ortography", icon: OrtographyIcon },
  { value: "rephrase", icon: RephraseIcon },
]

function OrtographyIcon() {
  return <Icons.ortography className="mr-2 h-4 w-4" />
}

function RephraseIcon() {
  return <Icons.rephrase className="mr-2 h-4 w-4" />
}

export function RadioGroupFormField({
  form,
  name,
  options,
}: RadioGroupFormFieldProps) {
  const t = useTranslations("RadioGroupFormField")
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="inline-flex gap-4"
              aria-label="correction-mode"
            >
              {options.map((option) => (
                <FormItem key={option.value}>
                  <FormLabel className="flex h-10 items-center justify-between rounded-md border border-input px-4 py-2 text-sm font-normal hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                    <FormControl>
                      <RadioGroupItem
                        aria-label={option.value}
                        value={option.value}
                        className="sr-only"
                      />
                    </FormControl>
                    <option.icon />
                    {t(`${option.value}`)}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  )
}
