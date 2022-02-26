import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";

export const validateDto = async <T extends ClassConstructor<any>>(
  dto: T,
  obj: Object
) => {
  const c = plainToClass(dto, obj);
  const errors = await validate(c);
  // errors is an array of validation errors
  if (errors.length > 0) {
    throw new TypeError(
      `validation failed. The error fields : ${errors.map(
        ({ property }) => property
      )}`
    );
  }
};
