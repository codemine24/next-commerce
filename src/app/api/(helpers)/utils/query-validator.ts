import httpStatus from "http-status";
import CustomizedError from "../error/customized-error";

const queryValidator = (
  queryValidationConfig: Record<string, string[]>,
  key: string,
  value: string
) => {
  // Step 1: Get allowed values for the given key from config
  const allowedValues = queryValidationConfig[key];

  // Step 2: If no validation rule exists for this key, return immediately (skip validation)
  if (!allowedValues) return;

  // Step 3: Normalize value into an array (split by comma if multiple values provided)
  const values = value.includes(",") ? value.split(",") : [value];

  // Step 4: Collect all invalid values (those not included in allowedValues)
  const invalidValues = values.filter((val) => !allowedValues.includes(val));

  // Step 5: If any invalid values exist, throw an error with detailed message
  if (invalidValues.length > 0) {
    throw new CustomizedError(
      httpStatus.BAD_REQUEST,
      `Invalid value(s) for '${key}': ${invalidValues.join(", ")}.
       Valid values are: ${allowedValues.map((i) => `'${i}'`).join(", ")}`
    );
  }

  // Step 6: If all values are valid, function completes silently (success)
};

export default queryValidator;
