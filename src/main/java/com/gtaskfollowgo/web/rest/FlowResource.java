package com.gtaskfollowgo.web.rest;

import com.gtaskfollowgo.domain.Flow;
import com.gtaskfollowgo.service.FlowService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * REST controller for managing {@link Flow}.
 */
@RestController
@RequestMapping("/api")
public class FlowResource {

    private final FlowService flowService;

    public FlowResource(FlowService flowService) {
        this.flowService = flowService;
    }

    /**
     * {@code GET /flows} : Retrieves all configured flows.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of flows in the body.
     *         Returns an empty list if no flows are configured.
     */
    @GetMapping("/flows")
    public ResponseEntity<List<Flow>> getAllFlows() {
        List<Flow> flows = flowService.findAll();
        return ResponseEntity.ok().body(flows);
    }
}