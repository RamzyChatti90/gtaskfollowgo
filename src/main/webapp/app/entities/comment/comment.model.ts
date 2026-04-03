import dayjs from 'dayjs/esm';
import { ITask } from 'app/entities/task/task.model';
import { IAppUser } from 'app/entities/app-user/app-user.model';

export interface IComment {
  id: number;
  content?: string | null;
  createdAt?: dayjs.Dayjs | null;
  task?: Pick<ITask, 'id'> | null;
  author?: Pick<IAppUser, 'id'> | null;
}

export type NewComment = Omit<IComment, 'id'> & { id: null };
