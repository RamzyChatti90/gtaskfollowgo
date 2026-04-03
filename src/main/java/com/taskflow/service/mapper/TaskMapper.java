package com.taskflow.service.mapper;

import com.taskflow.domain.AppUser;
import com.taskflow.domain.Tag;
import com.taskflow.domain.Task;
import com.taskflow.service.dto.AppUserDTO;
import com.taskflow.service.dto.TagDTO;
import com.taskflow.service.dto.TaskDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Task} and its DTO {@link TaskDTO}.
 */
@Mapper(componentModel = "spring")
public interface TaskMapper extends EntityMapper<TaskDTO, Task> {
    @Mapping(target = "assignedTo", source = "assignedTo", qualifiedByName = "appUserId")
    @Mapping(target = "tags", source = "tags", qualifiedByName = "tagIdSet")
    TaskDTO toDto(Task s);

    @Mapping(target = "removeTag", ignore = true)
    Task toEntity(TaskDTO taskDTO);

    @Named("appUserId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AppUserDTO toDtoAppUserId(AppUser appUser);

    @Named("tagId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    TagDTO toDtoTagId(Tag tag);

    @Named("tagIdSet")
    default Set<TagDTO> toDtoTagIdSet(Set<Tag> tag) {
        return tag.stream().map(this::toDtoTagId).collect(Collectors.toSet());
    }
}
