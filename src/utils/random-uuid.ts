import { nanoid } from 'nanoid'

export const getUUID = (size?: number) => nanoid(size ?? 64)
