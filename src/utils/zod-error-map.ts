import { ZodErrorMap, ZodIssueCode } from 'zod';

const typeTranslations: { [key: string]: string } = {
  string: 'texto',
  number: 'número',
  bigint: 'número grande',
  boolean: 'booleano',
  symbol: 'símbolo',
  undefined: 'indefinido',
  object: 'objeto',
  function: 'função',
  map: 'mapa',
  nan: 'NaN',
  integer: 'inteiro',
  float: 'decimal',
  date: 'data',
  null: 'nulo',
  array: 'array',
  unknown: 'desconhecido',
  promise: 'promessa',
  void: 'vazio',
  never: 'nunca',
  set: 'conjunto',
};

export const customErrorMap: ZodErrorMap = (issue, ctx) => {
  const fieldName =
    issue.path.length > 0
      ? String(issue.path[issue.path.length - 1]).toLowerCase()
      : '';

  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === 'undefined') {
        return { message: 'Este campo é obrigatório.' };
      }
      return {
        message: typeTranslations[issue.expected]
          ? `O campo precisa ser do tipo ${typeTranslations[issue.expected]}.`
          : 'O campo contém um valor inválido.',
      };

    case ZodIssueCode.too_small:
      if (issue.type === 'string') {
        if (issue.minimum === 1) {
          return { message: 'O campo não pode estar vazio.' };
        }
        return {
          message: `O campo precisa ter no mínimo ${issue.minimum} caracteres.`,
        };
      } else if (issue.type === 'array') {
        return {
          message: `O campo precisa ter no mínimo ${issue.minimum} itens.`,
        };
      }
      return { message: `O campo precisa ter no mínimo ${issue.minimum}.` };

    case ZodIssueCode.too_big:
      if (issue.type === 'string') {
        return {
          message: `O campo pode ter no máximo ${issue.maximum} caracteres.`,
        };
      } else if (issue.type === 'array') {
        return {
          message: `O campo pode ter no máximo ${issue.maximum} itens.`,
        };
      }
      return { message: `O campo pode ter no máximo ${issue.maximum}.` };

    case ZodIssueCode.invalid_string:
      if (issue.validation === 'email') {
        return { message: 'O campo deve conter um e-mail válido.' };
      }
      if (issue.validation === 'url') {
        return { message: 'O campo deve conter uma URL válida.' };
      }
      if (fieldName.includes('password')) {
        return { message: 'A senha não atende aos requisitos de segurança.' };
      }
      return { message: 'O campo contém um valor inválido.' };

    case ZodIssueCode.invalid_enum_value:
      return { message: 'O valor inserido não é permitido.' };

    case ZodIssueCode.unrecognized_keys:
      return {
        message: `Chaves não reconhecidas: ${issue.keys.join(', ')}.`,
      };

    case ZodIssueCode.invalid_union:
      return {
        message: 'O campo não corresponde a nenhum dos formatos válidos.',
      };

    case ZodIssueCode.invalid_union_discriminator:
      return { message: 'O campo possui um discriminador inválido.' };

    case ZodIssueCode.invalid_date:
      return { message: 'A data informada é inválida.' };

    case ZodIssueCode.invalid_literal:
      return { message: 'O valor não corresponde ao literal esperado.' };

    case ZodIssueCode.not_multiple_of:
      return { message: `O campo deve ser múltiplo de ${issue.multipleOf}.` };

    case ZodIssueCode.invalid_arguments:
      return { message: 'Os argumentos fornecidos não são válidos.' };

    case ZodIssueCode.invalid_return_type:
      return { message: 'O valor de retorno não é válido.' };

    case ZodIssueCode.invalid_intersection_types:
      return { message: 'Os tipos na interseção não são compatíveis.' };

    case ZodIssueCode.custom:
      return { message: issue.message || ctx.defaultError };

    default:
      return { message: ctx.defaultError };
  }
};
