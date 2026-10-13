export const date = (date) => {
    const newDate = new Date(date);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return newDate.toLocaleDateString("en-US", options);
}