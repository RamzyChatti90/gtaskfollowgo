package com.taskflow.service.mapper;

import com.taskflow.domain.Tag;
import com.taskflow.domain.Task;
import com.taskflow.service.dto.TagDTO;
import com.taskflow.service.dto.TaskDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Tag} and its DTO {@link TagDTO}.
 */
@Mapper(componentModel = "spring")
public interface TagMapper extends EntityMapper<TagDTO, Tag> {
    @Mapping(target = "tasks", source = "tasks", qualifiedByName = "taskIdSet")
    TagDTO toDto(Tag s);

    @Mapping(target = "tasks", ignore = true)
    @Mapping(target = "removeTask", ignore = true)
    Tag toEntity(TagDTO tagDTO);

    @Named("taskId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    TaskDTO toDtoTaskId(Task task);

    @Named("taskIdSet")
    default Set<TaskDTO> toDtoTaskIdSet(Set<Task> task) {
        return task.stream().map(this::toDtoTaskId).collect(Collectors.toSet());
    }
}
