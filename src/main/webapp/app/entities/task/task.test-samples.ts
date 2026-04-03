import dayjs from 'dayjs/esm';

import { ITask, NewTask } from './task.model';

export const sampleWithRequiredData: ITask = {
  id: 9181,
  title: 'or consequently',
  status: 'DONE',
  createdAt: dayjs('2026-04-03T07:26'),
};

export const sampleWithPartialData: ITask = {
  id: 11622,
  title: 'repeatedly',
  description: '../fake-data/blob/hipster.txt',
  status: 'DONE',
  createdAt: dayjs('2026-04-03T02:26'),
  updatedAt: dayjs('2026-04-02T12:43'),
};

export const sampleWithFullData: ITask = {
  id: 13396,
  title: 'where wherever',
  description: '../fake-data/blob/hipster.txt',
  dueDate: dayjs('2026-04-02'),
  priority: 4,
  status: 'DONE',
  createdAt: dayjs('2026-04-03T06:37'),
  updatedAt: dayjs('2026-04-02T13:01'),
};

export const sampleWithNewData: NewTask = {
  title: 'expostulate',
  status: 'IN_PROGRESS',
  createdAt: dayjs('2026-04-02T21:29'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
