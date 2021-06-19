export function defineGenderIcon(gender: string | undefined): string {
  switch (gender) {
    case 'female':
      return 'venus icon';
      break;
    case 'male':
      return 'mars icon';
      break;
    default:
      return 'genderless icon';
  }
}
