declare namespace objectidRandom {}

/**
 * Create ObjectId string from Date / milliseconds.
 * @param {Date|number} [date] optional Date / milliseconds.
 */
declare function objectidRandom(date?: Date | number): string;

export = objectidRandom;
