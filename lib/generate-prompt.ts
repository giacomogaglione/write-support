import { FormData } from "@/types/types"

export function generatePrompt(values: FormData): string {
  return `Sei un esperto linguista: correggi gli errori gramamticali del seguente testo in ${values.language}:
    ${values.text}
`
}
