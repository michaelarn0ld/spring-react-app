package com.capstone.facility.domain;

import com.capstone.facility.data.FacilityRepository;
import com.capstone.facility.models.Facility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FacilityService {

    @Autowired
    FacilityRepository repository;

    public Facility findById(int id) {
        return repository.findById(id);
    }
}
