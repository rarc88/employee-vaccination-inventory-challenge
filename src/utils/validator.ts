export const required = (value: string | undefined) =>
  (value ?? "").toString().trim().length === 0
    ? `Campo obligatorio`
    : undefined;

export const length = (value: string | undefined, length: number) =>
  (value ?? "").toString().trim().length !== length
    ? `Longitud permitida [${length}]`
    : undefined;

export const minLength = (value: string | undefined, length: number) =>
  (value ?? "").toString().trim().length < length
    ? `Longitud mínima permitida [${length}]`
    : undefined;

export const maxLength = (value: string | undefined, length: number) =>
  (value ?? "").toString().trim().length > length
    ? `Longitud máxima permitida [${length}]`
    : undefined;

export const email = (value: string | undefined) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.trim())
    ? "Correo electrónico invalido"
    : undefined;

export const onlyLetters = (value: string | undefined) =>
  value && !/^[a-zA-ZÀ-ÿ ]+$/.test(value.trim())
    ? "Sólo se permiten letras y espacios"
    : undefined;

export const onlyNumbers = (value: string | undefined) =>
  value && !/^\d+$/.test(value.trim()) ? "Sólo se permiten numeros" : undefined;
