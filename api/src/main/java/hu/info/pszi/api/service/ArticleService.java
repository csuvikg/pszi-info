package hu.info.pszi.api.service;

import hu.info.pszi.api.model.Version;
import hu.info.pszi.api.model.article.Article;
import hu.info.pszi.api.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.OptionalLong;
import java.util.stream.StreamSupport;

@Service
public class ArticleService {
    private final ArticleRepository repository;

    @Autowired
    public ArticleService(ArticleRepository repository) {
        this.repository = repository;
    }

    public Iterable<Article> findAll() {
        return repository.findAll();
    }

    public Optional<Article> findById(int id) {
        return repository.findById(id);
    }

    public Article create(Article article) {
        return repository.save(article);
    }

    @Cacheable("articlesVersion")
    public Optional<Version> getLatestVersion() {
        return Optional
                .of(StreamSupport.stream(repository.findAll().spliterator(), true)
                        .mapToLong(Article::getModifiedDate)
                        .max())
                .filter(OptionalLong::isPresent)
                .map(OptionalLong::getAsLong)
                .map(Version::new);
    }
}
