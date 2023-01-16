import { ResumeEntry } from "./api/v1";

export interface SheetRange {
  sheetName: string;
  start: string;
  end: string;
}

export interface Email {
  name: string;
  domain: string;
  tld: string;
}

export class ResumeEntriesByType {
  /**
   * @param entries A list of resume entries
   * @returns {ResumeEntriesByType} where the list is broken up into key/value pairs for each type
   */
  static fromResumeEntries(entries: ResumeEntry[]): ResumeEntriesByType {
    return entries
      .map((item) => ({ [item.type]: item }))
      .reduce<ResumeEntriesByType>((prev, curr) => {
        const currentItem = Object.values(curr)[0];
        if (!Object.keys(prev).includes(currentItem.type)) {
          prev[currentItem.type] = [];
        }
        prev[currentItem.type] = [...prev[currentItem.type], currentItem];
        return prev;
      }, {} as ResumeEntriesByType);
  }
}

export interface ResumeEntriesByType {
  bio: ResumeEntry[];
  education: ResumeEntry[];
  employment: ResumeEntry[];
  skillhard: ResumeEntry[];
  project: ResumeEntry[];
}
