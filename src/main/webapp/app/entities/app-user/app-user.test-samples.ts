import { IAppUser, NewAppUser } from './app-user.model';

export const sampleWithRequiredData: IAppUser = {
  id: 19407,
  login: 'nephew gah cutover',
  email: 'W-Vm{X@nY?.NlWa',
};

export const sampleWithPartialData: IAppUser = {
  id: 21531,
  login: 'ravel rudely robust',
  firstName: 'Alexandrine',
  email: 'q/"H\'@y;.S/^t5B',
  activated: true,
  langKey: 'requirement',
};

export const sampleWithFullData: IAppUser = {
  id: 1902,
  login: 'judgementally',
  firstName: 'Greta',
  lastName: 'Kemmer',
  email: 'OJE@&0UTzl.gLK',
  activated: false,
  langKey: 'aside',
};

export const sampleWithNewData: NewAppUser = {
  login: 'economise hepatitis what',
  email: '=kl@sfM\\.|',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
