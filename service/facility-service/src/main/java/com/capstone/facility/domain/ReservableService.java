package com.capstone.facility.domain;

import com.capstone.facility.data.ReservableRepository;
import com.capstone.facility.models.Reservable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservableService {

    @Autowired
    private ReservableRepository repository;

    public List<Reservable> findByFacilityId(int id) {
        return repository.findByFacilityId(id);
    }
}
