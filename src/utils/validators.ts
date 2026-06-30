// Type Guard that checks whether a title is a valid string.

export function isValidTitle(title: unknown): title is string {

    return typeof title === "string" && title.trim() !== "";
}