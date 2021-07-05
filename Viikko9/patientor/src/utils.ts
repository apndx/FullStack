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

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
