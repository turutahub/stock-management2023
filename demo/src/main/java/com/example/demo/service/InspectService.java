package com.example.demo.service;

import com.example.demo.model.InspectModel;
import com.example.demo.repository.InspectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InspectService {
    private final InspectRepository repository;

    public List<InspectModel> getAll() {
        return repository.getAll();
    }
    public InspectService(InspectRepository repository) {
        this.repository = repository;
    }
}
