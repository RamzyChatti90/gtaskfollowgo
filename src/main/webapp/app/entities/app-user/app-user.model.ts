export interface IAppUser {
  id: number;
  login?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  activated?: boolean | null;
  langKey?: string | null;
}

export type NewAppUser = Omit<IAppUser, 'id'> & { id: null };
