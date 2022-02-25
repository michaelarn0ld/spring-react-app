package com.capstone.facility.data;

import com.capstone.facility.models.Reservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ReservationJdbcTemplateRepository implements ReservationRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Reservation> findAll() {
        return null;
    }
}
