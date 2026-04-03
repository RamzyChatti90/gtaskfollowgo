package com.gtaskfollowgo.domain;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * Entité JPA représentant un flux, incluant un nom, un statut et une date de dernière mise à jour pour le suivi.
 */
@Entity
@Table(name = "flow")
public class Flow implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "last_updated_date", nullable = false)
    private Instant lastUpdatedDate;

    public Flow() {
        // No-arg constructor for JPA
    }

    public Flow(String name, String status, Instant lastUpdatedDate) {
        this.name = name;
        this.status = status;
        this.lastUpdatedDate = lastUpdatedDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Instant getLastUpdatedDate() {
        return lastUpdatedDate;
    }

    public void setLastUpdatedDate(Instant lastUpdatedDate) {
        this.lastUpdatedDate = lastUpdatedDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Flow flow = (Flow) o;
        return id != null && Objects.equals(id, flow.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return "Flow{" +
               "id=" + id +
               ", name='" + name + '\'' +
               ", status='" + status + '\'' +
               ", lastUpdatedDate=" + lastUpdatedDate +
               '}';
    }
}