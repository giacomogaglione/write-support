import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"

import { defaultValues, formSchema, type FormData } from "@/types/types"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import {
  RadioGroupFormField,
  options,
} from "@/components/form/radio-group-form-field"
import { Icons } from "@/components/icons"

import { SelectFormField } from "./select-form-field"

interface RecipeFormProps {
  onSubmit: (values: FormData, e: React.FormEvent) => void
  isLoading: boolean
}

export function CorrectionForm({ onSubmit, isLoading }: RecipeFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })
  const t = useTranslations("Form")

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-4 md:px-4"
      >
        <div className="inline-flex space-x-4">
          <FormItem>
            <SelectFormField form={form} name="language" />
          </FormItem>
          <RadioGroupFormField form={form} name="mode" options={options} />
        </div>
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder={t("textareaplaceholder")}
                  className="resize-none"
                  id="textarea-form-field"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isLoading ? (
          <Button disabled size="lg" className="w-full">
            <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
            {t("correctbuttonloading")}
          </Button>
        ) : (
          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-indigo-400 to-cyan-300 font-bold"
          >
            {t("correctbutton")}
          </Button>
        )}
      </form>
    </Form>
  )
}
