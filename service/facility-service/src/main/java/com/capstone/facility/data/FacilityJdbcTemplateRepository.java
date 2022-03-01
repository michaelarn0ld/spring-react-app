package com.capstone.facility.data;

import com.capstone.facility.data.mappers.FacilityMapper;
import com.capstone.facility.models.Facility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class FacilityJdbcTemplateRepository implements FacilityRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public Facility findById(int id) {
        final String sql = "SELECT * FROM facility WHERE id = ?;";
        return jdbcTemplate.query(sql, new FacilityMapper(), id)
                .stream()
                .findFirst()
                .orElse(null);
    }
}
