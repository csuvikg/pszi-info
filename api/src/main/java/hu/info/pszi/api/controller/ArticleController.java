package hu.info.pszi.api.controller;

import hu.info.pszi.api.exceptions.ResourceNotFoundException;
import hu.info.pszi.api.model.Version;
import hu.info.pszi.api.model.article.Article;
import hu.info.pszi.api.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/articles")
public class ArticleController {
    private final ArticleService service;

    @Autowired
    public ArticleController(ArticleService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<Iterable<Article>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Article> findById(@PathVariable int id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(ResourceNotFoundException::new);
    }

    @PostMapping
    public ResponseEntity<Article> create(@Validated @RequestBody Article article) {
        return ResponseEntity.ok(service.create(article));
    }

    @GetMapping("/version")
    public ResponseEntity<Version> getLatestVersion() {
        return ResponseEntity.ok(service.getLatestVersion());
    }
}
