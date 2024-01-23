export function delay(milisec: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, milisec)
  })
}
