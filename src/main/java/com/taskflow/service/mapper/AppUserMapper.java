package com.taskflow.service.mapper;

import com.taskflow.domain.AppUser;
import com.taskflow.service.dto.AppUserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link AppUser} and its DTO {@link AppUserDTO}.
 */
@Mapper(componentModel = "spring")
public interface AppUserMapper extends EntityMapper<AppUserDTO, AppUser> {}
