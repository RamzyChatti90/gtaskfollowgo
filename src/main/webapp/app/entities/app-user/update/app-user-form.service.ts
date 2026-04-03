import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IAppUser, NewAppUser } from '../app-user.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAppUser for edit and NewAppUserFormGroupInput for create.
 */
type AppUserFormGroupInput = IAppUser | PartialWithRequiredKeyOf<NewAppUser>;

type AppUserFormDefaults = Pick<NewAppUser, 'id' | 'activated'>;

type AppUserFormGroupContent = {
  id: FormControl<IAppUser['id'] | NewAppUser['id']>;
  login: FormControl<IAppUser['login']>;
  firstName: FormControl<IAppUser['firstName']>;
  lastName: FormControl<IAppUser['lastName']>;
  email: FormControl<IAppUser['email']>;
  activated: FormControl<IAppUser['activated']>;
  langKey: FormControl<IAppUser['langKey']>;
};

export type AppUserFormGroup = FormGroup<AppUserFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AppUserFormService {
  createAppUserFormGroup(appUser: AppUserFormGroupInput = { id: null }): AppUserFormGroup {
    const appUserRawValue = {
      ...this.getFormDefaults(),
      ...appUser,
    };
    return new FormGroup<AppUserFormGroupContent>({
      id: new FormControl(
        { value: appUserRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      login: new FormControl(appUserRawValue.login, {
        validators: [Validators.required],
      }),
      firstName: new FormControl(appUserRawValue.firstName),
      lastName: new FormControl(appUserRawValue.lastName),
      email: new FormControl(appUserRawValue.email, {
        validators: [Validators.required, Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$')],
      }),
      activated: new FormControl(appUserRawValue.activated),
      langKey: new FormControl(appUserRawValue.langKey),
    });
  }

  getAppUser(form: AppUserFormGroup): IAppUser | NewAppUser {
    return form.getRawValue() as IAppUser | NewAppUser;
  }

  resetForm(form: AppUserFormGroup, appUser: AppUserFormGroupInput): void {
    const appUserRawValue = { ...this.getFormDefaults(), ...appUser };
    form.reset(
      {
        ...appUserRawValue,
        id: { value: appUserRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): AppUserFormDefaults {
    return {
      id: null,
      activated: false,
    };
  }
}
