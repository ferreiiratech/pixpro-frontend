import { z } from "zod"

const publicSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_CLOUDFLARE_R2_PUBLIC_DOMAIN: z.string().url(),
})

const rawPublicEnv = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_CLOUDFLARE_R2_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_CLOUDFLARE_R2_PUBLIC_DOMAIN,
}

const parsedPublic = publicSchema.safeParse(rawPublicEnv)

if (!parsedPublic.success) {
  const erro = parsedPublic.error.issues
    .map(issue => `${issue.path.join(".")}: ${issue.message}`)
    .join(", ")

  console.error(`Erro nas variáveis públicas: ${erro}`)

  throw new Error(`Erro nas variáveis públicas: ${erro}`)
}

export const publicEnv = parsedPublic.data
