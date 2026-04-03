import { ITask } from 'app/entities/task/task.model';

export interface ITag {
  id: number;
  name?: string | null;
  tasks?: Pick<ITask, 'id'>[] | null;
}

export type NewTag = Omit<ITag, 'id'> & { id: null };
