import { SetMetadata } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const cryptPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};
