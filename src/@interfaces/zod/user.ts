import { z } from 'zod';
import { UserType } from '../user';

/**
 * @summary Edit a new User
 */

const RoleEnum = z.enum(['ADMIN', 'USER', 'MANAGER', 'FOUNDER']);

export const editUserBody = z.object({
  last_name: z
    .string()
    .min(1, 'O sobrenome é obrigatório.')
    .max(80, 'O sobrenome deve ter no máximo 80 caracteres.')
    .optional(),

  name: z
    .string()
    .min(1, 'O nome é obrigatório.')
    .max(30, 'O nome deve ter no máximo 30 caracteres.')
    .optional(),

  email: z.string().email('O email deve ser válido.'),

  image: z
    .string()
    .url('A imagem deve ser uma URL válida.')
    .regex(
      /\.(jpeg|jpg|png|gif|bmp|webp)$/i,
      'A imagem deve ter um formato válido (jpeg, jpg, png, gif, bmp, webp).',
    )
    .optional(),

  role: RoleEnum.optional(),
});

export const editUserEmailBody = z.object({
  email: z.string().email('O email deve ser válido.'),
});

export type UserTypes = {
  user: UserType;
  'edit-user-email': z.infer<typeof editUserEmailBody>;
  'edit-user-general': z.infer<typeof editUserBody>;
};
