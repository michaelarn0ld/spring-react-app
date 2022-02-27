package com.capstone.facility.data.mappers;

import com.capstone.facility.data.FacilityRepository;
import com.capstone.facility.models.Facility;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalTime;

public class FacilityMapper implements RowMapper<Facility> {
    @Override
    public Facility mapRow(ResultSet rs, int rowNum) throws SQLException {
        Facility facility = new Facility();
        facility.setId(rs.getInt("id"));
        facility.setName(rs.getString("facility_name"));
        facility.setOpen(rs.getObject("open_time", LocalTime.class));
        facility.setClose(rs.getObject("close_time", LocalTime.class));
        return facility;
    }
}
