package com.taskflow.domain;

import static com.taskflow.domain.AppUserTestSamples.*;
import static com.taskflow.domain.TagTestSamples.*;
import static com.taskflow.domain.TaskTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.taskflow.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class TaskTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Task.class);
        Task task1 = getTaskSample1();
        Task task2 = new Task();
        assertThat(task1).isNotEqualTo(task2);

        task2.setId(task1.getId());
        assertThat(task1).isEqualTo(task2);

        task2 = getTaskSample2();
        assertThat(task1).isNotEqualTo(task2);
    }

    @Test
    void assignedToTest() {
        Task task = getTaskRandomSampleGenerator();
        AppUser appUserBack = getAppUserRandomSampleGenerator();

        task.setAssignedTo(appUserBack);
        assertThat(task.getAssignedTo()).isEqualTo(appUserBack);

        task.assignedTo(null);
        assertThat(task.getAssignedTo()).isNull();
    }

    @Test
    void tagTest() {
        Task task = getTaskRandomSampleGenerator();
        Tag tagBack = getTagRandomSampleGenerator();

        task.addTag(tagBack);
        assertThat(task.getTags()).containsOnly(tagBack);

        task.removeTag(tagBack);
        assertThat(task.getTags()).doesNotContain(tagBack);

        task.tags(new HashSet<>(Set.of(tagBack)));
        assertThat(task.getTags()).containsOnly(tagBack);

        task.setTags(new HashSet<>());
        assertThat(task.getTags()).doesNotContain(tagBack);
    }
}
