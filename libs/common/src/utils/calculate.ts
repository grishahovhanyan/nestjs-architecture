export function calculateAge(birthDate: string | Date) {
  const birth = new Date(birthDate)
  const current = new Date()

  let age = current.getFullYear() - birth.getFullYear()
  if (
    current.getMonth() < birth.getMonth() ||
    (current.getMonth() === birth.getMonth() && current.getDate() < birth.getDate())
  ) {
    age--
  }

  return age
}
