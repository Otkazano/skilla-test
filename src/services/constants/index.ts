export const DEFAULT_DATE_START = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split('T')[0];

export const DEFAULT_DATE_END = new Date().toISOString().split('T')[0];

export enum Ratings {
  Bad = 'Плохо',
  Good = 'Хорошо',
  Excellent = 'Отлично',
  ScriptNotUsed = 'Скрипт не использован',
}
