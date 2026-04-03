package com.taskflow.service.mapper;

import com.taskflow.domain.AppUser;
import com.taskflow.domain.Comment;
import com.taskflow.domain.Task;
import com.taskflow.service.dto.AppUserDTO;
import com.taskflow.service.dto.CommentDTO;
import com.taskflow.service.dto.TaskDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Comment} and its DTO {@link CommentDTO}.
 */
@Mapper(componentModel = "spring")
public interface CommentMapper extends EntityMapper<CommentDTO, Comment> {
    @Mapping(target = "task", source = "task", qualifiedByName = "taskId")
    @Mapping(target = "author", source = "author", qualifiedByName = "appUserId")
    CommentDTO toDto(Comment s);

    @Named("taskId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    TaskDTO toDtoTaskId(Task task);

    @Named("appUserId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AppUserDTO toDtoAppUserId(AppUser appUser);
}
