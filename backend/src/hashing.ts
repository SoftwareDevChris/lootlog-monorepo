import * as bcrypt from "bcrypt";

const saltRounds = 12;

export async function hash(value: string) {
  const result = await bcrypt.hash(value, saltRounds);
  return result;
}

export async function compare(value: string, hashedValue: string) {
  const isMatching = await bcrypt.compare(value, hashedValue);
  return isMatching;
}
