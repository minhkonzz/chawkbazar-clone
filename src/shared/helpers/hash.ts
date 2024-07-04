import bcrypt from "bcrypt";

export const hash = async (plain: string): Promise<string> => {
   return bcrypt.hash(plain, 10);
};

export const compare = async (
   plain: string, 
   hashed: string
): Promise<boolean> => {
   return bcrypt.compare(plain, hashed);
}