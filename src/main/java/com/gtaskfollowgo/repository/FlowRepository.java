package com.gtaskfollowgo.repository;

import com.gtaskfollowgo.domain.Flow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the {@link Flow} entity.
 */
@Repository
public interface FlowRepository extends JpaRepository<Flow, Long> {
}