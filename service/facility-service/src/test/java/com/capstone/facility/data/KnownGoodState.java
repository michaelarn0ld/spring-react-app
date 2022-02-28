package com.capstone.facility.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

public class KnownGoodState {
    @Autowired
    JdbcTemplate jdbcTemplate;

    static boolean hasRun;

    void set() {
        if (!hasRun) {
            hasRun = true;
            jdbcTemplate.update("CALL set_known_good_state();");
        }
    }
}
