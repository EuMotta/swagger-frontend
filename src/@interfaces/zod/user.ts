import { z } from 'zod';

import { UserType } from '../user';

/**
 * Esquema de validação para a criação de um usuário.
 *
 * @constant {createUserBodyLastNameMax} - Tamanho máximo do sobrenome
 * @constant {createUserBodyNameMax} - Tamanho máximo do nome
 * @constant {createUserBodyEmailMax} - Tamanho máximo do email
 * @constant {createUserBodyPasswordMin} - Tamanho mínimo da senha
 */

export const createUserBodyLastNameMax = 80;
export const createUserBodyNameMax = 30;
export const createUserBodyEmailMax = 256;
export const createUserBodyPasswordMin = 6;

/**
 * Enumeração dos papéis (roles) disponíveis para um usuário.
 *
 * @constant {z.ZodEnum}
 * @enum {string}
 */

const RoleEnum = z.enum(['ADMIN', 'USER', 'MANAGER', 'FOUNDER']);

/**
 * Esquema de validação para a criação de um usuário.
 *
 * @constant {z.ZodObject}
 * @property {string} last_name - Sobrenome do usuário (1 a 80 caracteres).
 * @property {string} name - Nome do usuário (1 a 30 caracteres).
 * @property {string} email - Email válido (1 a 256 caracteres).
 * @property {string} password - Senha com pelo menos 6 caracteres.
 */

export const createUserBody = z.object({
  last_name: z
    .string({
      required_error: 'O sobrenome é obrigatório',
    })
    .min(1, 'O sobrenome é obrigatório.')
    .max(
      createUserBodyLastNameMax,
      'O sobrenome deve ter no máximo 80 caracteres.',
    ),

  name: z
    .string({
      required_error: 'O nome é obrigatório',
    })
    .min(1, {
      message: 'O nome é obrigatório.',
    })
    .max(createUserBodyNameMax, {
      message: 'O nome deve ter no máximo 30 caracteres.',
    }),

  email: z
    .string({
      required_error: 'O email é obrigatório',
    })
    .max(createUserBodyEmailMax)
    .email({
      message: 'O email deve ser válido.',
    }),
  password: z
    .string({
      required_error: 'A senha é obrigatória',
    })
    .min(createUserBodyPasswordMin, {
      message: 'Senha obrigatória',
    }),

  role: RoleEnum,
});

/**
 * Esquema de validação para a edição de um usuário.
 *
 * @constant {z.ZodObject}
 * @property {string} [last_name] - Sobrenome do usuário (opcional, 1 a 80 caracteres).
 * @property {string} [name] - Nome do usuário (opcional, 1 a 30 caracteres).
 * @property {string} [image] - URL da imagem do usuário (deve ser válida e ter formato permitido).
 * @property {RoleEnum} [role] - Papel do usuário (opcional).
 */

export const editUserBody = z.object({
  last_name: z
    .string({
      required_error: 'O sobrenome é obrigatório',
    })
    .min(1, 'O sobrenome é obrigatório.')
    .max(
      createUserBodyLastNameMax,
      'O sobrenome deve ter no máximo 80 caracteres.',
    ),

  name: z
    .string({
      required_error: 'O nome é obrigatório',
    })
    .min(1, {
      message: 'O nome é obrigatório.',
    })
    .max(createUserBodyNameMax, {
      message: 'O nome deve ter no máximo 30 caracteres.',
    }),

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

/**
 * Esquema de validação para a edição do email de um usuário.
 *
 * @constant {z.ZodObject}
 * @property {string} email - Email válido (máximo de 256 caracteres).
 */

export const editUserEmailBody = z.object({
  email: z
    .string({
      required_error: 'O email é obrigatório',
    })
    .max(createUserBodyEmailMax)
    .email({
      message: 'O email deve ser válido.',
    }),
});

/**
 * Esquema de validação para a edição da senha de um usuário.
 *
 * @constant {z.ZodObject}
 * @property {string} new_password - Nova senha com pelo menos 6 caracteres, incluindo:
 *   - Pelo menos uma letra maiúscula.
 *   - Pelo menos uma letra minúscula.
 *   - Pelo menos um caractere especial.
 */

export const editUserPasswordBody = z.object({
  new_password: z
    .string({
      required_error: 'A nova senha é obrigatória',
    })
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
    .regex(/[A-Z]/, {
      message: 'A senha deve conter pelo menos uma letra maiúscula.',
    })
    .regex(/[a-z]/, {
      message: 'A senha deve conter pelo menos uma letra minúscula.',
    })
    .regex(/[\W_]/, {
      message: 'A senha deve conter pelo menos um caractere especial.',
    }),
});

/**
 * Tipos de dados para operações relacionadas ao usuário.
 *
 * @type {Object} UserTypes
 * @property {UserType} user - Tipo base de usuário.
 * @property {z.infer<typeof editUserEmailBody>} edit-user-email - Estrutura para editar o email do usuário.
 * @property {z.infer<typeof editUserPasswordBody>} edit-user-password - Estrutura para editar a senha do usuário.
 * @property {z.infer<typeof editUserBody>} edit-user-general - Estrutura para edições gerais do usuário.
 */

export type UserTypes = {
  user: UserType;
  'create-user': z.infer<typeof createUserBody>;
  'edit-user-email': z.infer<typeof editUserEmailBody>;
  'edit-user-password': z.infer<typeof editUserPasswordBody>;
  'edit-user-general': z.infer<typeof editUserBody>;
};
