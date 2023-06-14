package com.example.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static org.springframework.web.cors.CorsConfiguration.ALL;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().configurationSource(allPermitCors()).and().csrf().disable();
    }

    private CorsConfigurationSource allPermitCors() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedMethod(ALL);
        config.addAllowedHeader(ALL);
        config.addAllowedOrigin(ALL);
        config.setAllowCredentials(false);  // AllowdOrigins(ドメイン名)に"*"を使いたい場合、ここはtrueにしてはならない
        config.setAllowedOrigins(List.of(ALL));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
