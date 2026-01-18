import type { ApiEvent } from "~/types";

type Validator = (form: ApiEvent) => string | null;

const validators: Validator[] = [
  (f) => (!f.name.trim() ? "Name is required." : null),

  (f) =>
    !Number.isFinite(f.year) || f.year < 1900 || f.year > 2100
      ? "Year looks invalid."
      : null,

  (f) => (!f.startDate ? "Start date is required." : null),

  (f) => (!f.endDate ? "End date is required." : null),

  (f) =>
    f.startDate && f.endDate && f.startDate > f.endDate
      ? "Start date must be before end date."
      : null,
];

export function validate(form: ApiEvent): string[] {
  return validators
    .map((v) => v(form))
    .filter((msg): msg is string => Boolean(msg));
}
