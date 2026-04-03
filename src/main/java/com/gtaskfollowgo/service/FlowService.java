package com.gtaskfollowgo.service;

import com.gtaskfollowgo.domain.Flow;
import com.gtaskfollowgo.repository.FlowRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlowService {

    private final FlowRepository flowRepository;

    public FlowService(FlowRepository flowRepository) {
        this.flowRepository = flowRepository;
    }

    /**
     * Récupère la liste de tous les flux disponibles dans le système.
     *
     * @return Une liste de {@link Flow}, potentiellement vide si aucun flux n'est configuré.
     */
    public List<Flow> getAllFlows() {
        return flowRepository.findAll();
    }
}