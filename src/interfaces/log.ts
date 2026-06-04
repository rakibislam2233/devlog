export type LogStatus = "draft" | "completed" | "archived";

export type LogCategory =
  | "feature"
  | "bugfix"
  | "refactor"
  | "research"
  | "docs"
  | "other";

export interface Log {
  id: string;
  creatorId: string;
  whatIDid: string;
  whatILearned: string;
  whatIWillDoTomorrow: string;
  status: LogStatus;
  hoursSpent: string;
  category: LogCategory;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateLogInput {
  whatIDid: string;
  whatILearned: string;
  whatIWillDoTomorrow: string;
  hoursSpent: string;
  category: LogCategory;
  date: string;
  status?: LogStatus;
}

export interface UpdateLogInput extends Partial<CreateLogInput> {}

export interface ActionResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}
