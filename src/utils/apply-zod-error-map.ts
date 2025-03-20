import { z } from 'zod';

import { customErrorMap } from './zod-error-map';

export const applyZodErrorMap = () => {
  z.setErrorMap(customErrorMap);
};
