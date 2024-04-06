import { z } from 'zod';

export const petIdSchema = z.string().cuid();

export const petFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Name is required' })
    .max(100, { message: 'Name must be less than 100 characters' }),
  ownerName: z
    .string()
    .trim()
    .min(1, { message: 'Owner name is required' })
    .max(100, { message: 'Owner name must be less than 100 characters' }),
  imageUrl: z.union([
    z.literal(''),
    z.string().trim().url({ message: 'Invalid URL' }),
  ]),
  age: z.coerce
    .number()
    .int()
    .positive()
    .min(1, { message: 'Age must be greater than 0' })
    .max(999, { message: 'Age must be less than 1000' }),
  notes: z.union([
    z.literal(''),
    z
      .string()
      .trim()
      .max(1000, { message: 'Notes must be less than 500 characters' }),
  ]),
});

export type TPetForm = z.infer<typeof petFormSchema>;

export const authSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().max(100),
})

export type TAuth = z.infer<typeof authSchema>
