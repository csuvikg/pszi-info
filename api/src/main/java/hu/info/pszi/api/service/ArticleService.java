package hu.info.pszi.api.service;

import hu.info.pszi.api.model.Version;
import hu.info.pszi.api.model.article.Article;
import hu.info.pszi.api.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ArticleService extends BaseService {
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

    @Cacheable("version")
    @Override
    public Optional<Version> getLatestVersion() {
        return getLatestVersion(repository);
    }
}
