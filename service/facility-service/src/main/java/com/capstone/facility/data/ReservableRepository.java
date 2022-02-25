package com.capstone.facility.data;

import com.capstone.facility.models.Reservable;

import java.util.List;

public interface ReservableRepository {
    List<Reservable> findByFacilityId(int id);
}
