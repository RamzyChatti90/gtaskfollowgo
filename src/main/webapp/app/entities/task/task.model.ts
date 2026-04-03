import dayjs from 'dayjs/esm';
import { IAppUser } from 'app/entities/app-user/app-user.model';
import { ITag } from 'app/entities/tag/tag.model';

export interface ITask {
  id: number;
  title?: string | null;
  description?: string | null;
  dueDate?: dayjs.Dayjs | null;
  priority?: number | null;
  status?: string | null;
  createdAt?: dayjs.Dayjs | null;
  updatedAt?: dayjs.Dayjs | null;
  assignedTo?: Pick<IAppUser, 'id'> | null;
  tags?: Pick<ITag, 'id'>[] | null;
}

export type NewTask = Omit<ITask, 'id'> & { id: null };
