export const getErrorMessage = (error: unknown, genericErrorMessage: string | null = null): string => {
  if (error instanceof Error) {
    return genericErrorMessage + error.message
  }
  return 'Unknown error'
}
