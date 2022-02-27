package com.capstone.facility.data;

import com.capstone.facility.data.mappers.ReservationMapper;
import com.capstone.facility.models.Reservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public class ReservationJdbcTemplateRepository implements ReservationRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public List<Reservation> findByFacilityIdReservableIdDate(
            int facilityId,
            int reservableId,
            LocalDate date) {
        final String sql = "SELECT r.id, r.app_user_id, r.equipment_id, "
                + "r.start_time, r.end_time "
                + "FROM reservation r "
                + "INNER JOIN equipment e ON r.equipment_id = e.id "
                + "INNER JOIN facility f ON f.id = e.facility_id "
                + "INNER JOIN reservable rb ON rb.id = e.reservable_id "
                + "WHERE r.start_time::date = ? "
                + "AND f.id = ? "
                + "AND rb.id = ?;";

        List<Reservation> reservations = jdbcTemplate.query(
                sql, new ReservationMapper(), date, facilityId, reservableId);

        if (reservations.size() == 0) {
            return reservations;
        }

        reservations.forEach(r -> {
            addFacility(r);
            addReservable(r);
        });

        return reservations;
    }

    private void addFacility(Reservation reservation) {

    }

    private void addReservable(Reservation reservation) {

    }
}
