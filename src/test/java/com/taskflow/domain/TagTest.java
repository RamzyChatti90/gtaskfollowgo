package com.taskflow.domain;

import static com.taskflow.domain.TagTestSamples.*;
import static com.taskflow.domain.TaskTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.taskflow.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class TagTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tag.class);
        Tag tag1 = getTagSample1();
        Tag tag2 = new Tag();
        assertThat(tag1).isNotEqualTo(tag2);

        tag2.setId(tag1.getId());
        assertThat(tag1).isEqualTo(tag2);

        tag2 = getTagSample2();
        assertThat(tag1).isNotEqualTo(tag2);
    }

    @Test
    void taskTest() {
        Tag tag = getTagRandomSampleGenerator();
        Task taskBack = getTaskRandomSampleGenerator();

        tag.addTask(taskBack);
        assertThat(tag.getTasks()).containsOnly(taskBack);
        assertThat(taskBack.getTags()).containsOnly(tag);

        tag.removeTask(taskBack);
        assertThat(tag.getTasks()).doesNotContain(taskBack);
        assertThat(taskBack.getTags()).doesNotContain(tag);

        tag.tasks(new HashSet<>(Set.of(taskBack)));
        assertThat(tag.getTasks()).containsOnly(taskBack);
        assertThat(taskBack.getTags()).containsOnly(tag);

        tag.setTasks(new HashSet<>());
        assertThat(tag.getTasks()).doesNotContain(taskBack);
        assertThat(taskBack.getTags()).doesNotContain(tag);
    }
}
