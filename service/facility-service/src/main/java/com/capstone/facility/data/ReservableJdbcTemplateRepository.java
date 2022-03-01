package com.capstone.facility.data;

import com.capstone.facility.data.mappers.ReservableMapper;
import com.capstone.facility.models.Reservable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ReservableJdbcTemplateRepository implements ReservableRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public List<Reservable> findByFacilityId(int facilityId) {
        final String sql = "SELECT DISTINCT r.id, r.reservable_name FROM equipment e "
                + "INNER JOIN reservable r ON r.id = e.reservable_id "
                + "INNER JOIN facility f ON e.facility_id = f.id "
                + "WHERE f.id = ?;";
        return jdbcTemplate.query(sql, new ReservableMapper(), facilityId);
    }

    @Override
    public int findReservableQuantityByFacility(int facilityId, int reservableId) {
        final String sql = "SELECT COUNT(*) FROM equipment "
                + "WHERE facility_id = ? and reservable_id = ?;";
        return (int)(jdbcTemplate.queryForObject(sql, Integer.class, facilityId, reservableId));
    }

}
