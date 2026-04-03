import dayjs from 'dayjs/esm';

import { IComment, NewComment } from './comment.model';

export const sampleWithRequiredData: IComment = {
  id: 20452,
  content: '../fake-data/blob/hipster.txt',
  createdAt: dayjs('2026-04-03T00:19'),
};

export const sampleWithPartialData: IComment = {
  id: 12398,
  content: '../fake-data/blob/hipster.txt',
  createdAt: dayjs('2026-04-02T13:20'),
};

export const sampleWithFullData: IComment = {
  id: 28427,
  content: '../fake-data/blob/hipster.txt',
  createdAt: dayjs('2026-04-02T22:04'),
};

export const sampleWithNewData: NewComment = {
  content: '../fake-data/blob/hipster.txt',
  createdAt: dayjs('2026-04-03T07:04'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
