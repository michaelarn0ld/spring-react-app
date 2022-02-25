package com.capstone.facility.data;

import com.capstone.facility.models.Reservation;

import java.util.List;

public interface ReservationRepository {
    List<Reservation> findAll();
}
