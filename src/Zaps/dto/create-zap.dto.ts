// create-zap.dto.ts
import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { z } from 'zod';

export const ZapCreateSchema = z.object({
  availableTriggerId: z.string(),
  actions: z.array(
    z.object({
      availableActionId: z.string(),
      actionMetadata: z.any()
    })
  )
});

export type ZapCreateDto = z.infer<typeof ZapCreateSchema>;