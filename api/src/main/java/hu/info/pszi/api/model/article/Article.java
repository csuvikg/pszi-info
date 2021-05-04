package hu.info.pszi.api.model.article;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Data
@Entity(name = "article")
@EntityListeners(AuditingEntityListener.class)
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank
    private String title;

    @Lob
    @NotBlank
    private String content;

    @Column(nullable = false, updatable = false)
    @CreatedDate
    @JsonIgnore
    private long createdDate;

    @LastModifiedDate
    @JsonIgnore
    private long modifiedDate;
}
