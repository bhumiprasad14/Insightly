package com.research.assistant;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
public class LanguageService {

    private final WebClient webClient;

    @Value("${languages.api.url}")
    private String languagesApiUrl;

    public LanguageService(WebClient.Builder builder) {
        this.webClient = builder.build();
    }

    public List<Language> getLanguages() {

        return webClient.get()
                .uri(languagesApiUrl)
                .retrieve()
                .bodyToFlux(Language.class)
                .collectList()
                .block();
    }
}