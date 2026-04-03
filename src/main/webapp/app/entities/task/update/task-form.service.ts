import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ITask, NewTask } from '../task.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITask for edit and NewTaskFormGroupInput for create.
 */
type TaskFormGroupInput = ITask | PartialWithRequiredKeyOf<NewTask>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ITask | NewTask> = Omit<T, 'createdAt' | 'updatedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
};

type TaskFormRawValue = FormValueOf<ITask>;

type NewTaskFormRawValue = FormValueOf<NewTask>;

type TaskFormDefaults = Pick<NewTask, 'id' | 'createdAt' | 'updatedAt' | 'tags'>;

type TaskFormGroupContent = {
  id: FormControl<TaskFormRawValue['id'] | NewTask['id']>;
  title: FormControl<TaskFormRawValue['title']>;
  description: FormControl<TaskFormRawValue['description']>;
  dueDate: FormControl<TaskFormRawValue['dueDate']>;
  priority: FormControl<TaskFormRawValue['priority']>;
  status: FormControl<TaskFormRawValue['status']>;
  createdAt: FormControl<TaskFormRawValue['createdAt']>;
  updatedAt: FormControl<TaskFormRawValue['updatedAt']>;
  assignedTo: FormControl<TaskFormRawValue['assignedTo']>;
  tags: FormControl<TaskFormRawValue['tags']>;
};

export type TaskFormGroup = FormGroup<TaskFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TaskFormService {
  createTaskFormGroup(task: TaskFormGroupInput = { id: null }): TaskFormGroup {
    const taskRawValue = this.convertTaskToTaskRawValue({
      ...this.getFormDefaults(),
      ...task,
    });
    return new FormGroup<TaskFormGroupContent>({
      id: new FormControl(
        { value: taskRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      title: new FormControl(taskRawValue.title, {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
      }),
      description: new FormControl(taskRawValue.description),
      dueDate: new FormControl(taskRawValue.dueDate),
      priority: new FormControl(taskRawValue.priority, {
        validators: [Validators.min(1), Validators.max(5)],
      }),
      status: new FormControl(taskRawValue.status, {
        validators: [Validators.required, Validators.pattern('^(TODO|IN_PROGRESS|DONE|BLOCKED)$')],
      }),
      createdAt: new FormControl(taskRawValue.createdAt, {
        validators: [Validators.required],
      }),
      updatedAt: new FormControl(taskRawValue.updatedAt),
      assignedTo: new FormControl(taskRawValue.assignedTo),
      tags: new FormControl(taskRawValue.tags ?? []),
    });
  }

  getTask(form: TaskFormGroup): ITask | NewTask {
    return this.convertTaskRawValueToTask(form.getRawValue() as TaskFormRawValue | NewTaskFormRawValue);
  }

  resetForm(form: TaskFormGroup, task: TaskFormGroupInput): void {
    const taskRawValue = this.convertTaskToTaskRawValue({ ...this.getFormDefaults(), ...task });
    form.reset(
      {
        ...taskRawValue,
        id: { value: taskRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TaskFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdAt: currentTime,
      updatedAt: currentTime,
      tags: [],
    };
  }

  private convertTaskRawValueToTask(rawTask: TaskFormRawValue | NewTaskFormRawValue): ITask | NewTask {
    return {
      ...rawTask,
      createdAt: dayjs(rawTask.createdAt, DATE_TIME_FORMAT),
      updatedAt: dayjs(rawTask.updatedAt, DATE_TIME_FORMAT),
    };
  }

  private convertTaskToTaskRawValue(
    task: ITask | (Partial<NewTask> & TaskFormDefaults),
  ): TaskFormRawValue | PartialWithRequiredKeyOf<NewTaskFormRawValue> {
    return {
      ...task,
      createdAt: task.createdAt ? task.createdAt.format(DATE_TIME_FORMAT) : undefined,
      updatedAt: task.updatedAt ? task.updatedAt.format(DATE_TIME_FORMAT) : undefined,
      tags: task.tags ?? [],
    };
  }
}
