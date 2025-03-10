export function formatDate(date: string | Date | number) {
  try {
    let fmt = new Intl.DateTimeFormat("en-gb", {
      day: "numeric",
      weekday: "long",
      month: "short",
      year: "numeric",
    });

    return fmt.format(new Date(date));
  } catch (error) {
    if (import.meta.env.DEV) {
      console.info("Invalid date value, or Intl.Config value");
    }
    return "-";
  }
}

export function dateToISO(date: string | Date | number) {
  try {
    return new Date(date).toISOString();
  } catch (error) {
    if (import.meta.env.DEV) {
      console.info("Invalid date value");
    }
    return "-";
  }
}
