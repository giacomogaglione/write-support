import * as z from "zod"

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
}

export const formSchema = z.object({
  text: z.string().min(10, {
    message: "Text must be at least 10 characters.",
  }),
  language: z.string().optional(),
  mode: z.enum(["ortography", "rephrase"]).optional(),
})

export const defaultValues: FormData = {
  text: "",
  language: "it",
  mode: "ortography",
}

export type FormData = z.infer<typeof formSchema>
