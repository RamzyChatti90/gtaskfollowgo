import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITask } from 'app/entities/task/task.model';
import { TaskService } from 'app/entities/task/service/task.service';
import { ITag } from '../tag.model';
import { TagService } from '../service/tag.service';
import { TagFormGroup, TagFormService } from './tag-form.service';

@Component({
  selector: 'jhi-tag-update',
  templateUrl: './tag-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TagUpdateComponent implements OnInit {
  isSaving = false;
  tag: ITag | null = null;

  tasksSharedCollection: ITask[] = [];

  protected tagService = inject(TagService);
  protected tagFormService = inject(TagFormService);
  protected taskService = inject(TaskService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TagFormGroup = this.tagFormService.createTagFormGroup();

  compareTask = (o1: ITask | null, o2: ITask | null): boolean => this.taskService.compareTask(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tag }) => {
      this.tag = tag;
      if (tag) {
        this.updateForm(tag);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tag = this.tagFormService.getTag(this.editForm);
    if (tag.id !== null) {
      this.subscribeToSaveResponse(this.tagService.update(tag));
    } else {
      this.subscribeToSaveResponse(this.tagService.create(tag));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITag>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(tag: ITag): void {
    this.tag = tag;
    this.tagFormService.resetForm(this.editForm, tag);

    this.tasksSharedCollection = this.taskService.addTaskToCollectionIfMissing<ITask>(this.tasksSharedCollection, ...(tag.tasks ?? []));
  }

  protected loadRelationshipsOptions(): void {
    this.taskService
      .query()
      .pipe(map((res: HttpResponse<ITask[]>) => res.body ?? []))
      .pipe(map((tasks: ITask[]) => this.taskService.addTaskToCollectionIfMissing<ITask>(tasks, ...(this.tag?.tasks ?? []))))
      .subscribe((tasks: ITask[]) => (this.tasksSharedCollection = tasks));
  }
}
