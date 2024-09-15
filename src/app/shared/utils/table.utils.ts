import { Activity } from "../models/activity.model";

interface SortEvent {
  field: string;
  order: number;
}

export class TableUtils {
    static sortRows(event: SortEvent, runs: Activity[]) {
    runs.sort((a, b) => {
      const valueA = a[event.field as keyof Activity] ?? 0;
      const valueB = b[event.field as keyof Activity] ?? 0;

      let result = 0;
      if (valueA < valueB) result = -1;
      if (valueA > valueB) result = 1;

      return result * event.order;
    });
  }

  static sortRowsByYear(event: { field: string, order: number }, runs: Activity[]) {
    const field = event.field as keyof Activity;
    const order = event.order;

    runs.sort((a, b) => {
      const valueA = a[field] ?? 0;
      const valueB = b[field] ?? 0;

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueA.localeCompare(valueB) * order;
      }

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return (valueA - valueB) * order;
      }

      let result = 0;
      if (valueA < valueB) result = -1;
      if (valueA > valueB) result = 1;

      return result * order;
    });
  }
}