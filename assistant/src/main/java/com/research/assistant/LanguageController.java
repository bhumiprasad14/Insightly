package com.research.assistant;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/languages")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class LanguageController {

    private final LanguageService languageService;

    @GetMapping
    public List<Language> getLanguages() {
        return languageService.getLanguages();
    }
}