package com.capstone.auth.data;

import com.capstone.auth.data.mappers.AppUserMapper;
import com.capstone.auth.models.AppUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.util.List;

@Repository
public class AppUserJdbcTemplateRepository implements AppUserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<AppUser> findAll() {
        final String sql = "SELECT * FROM app_user;";
        return jdbcTemplate.query(sql, new AppUserMapper());
    }

    @Override
    public boolean noDuplicateUsers(String username, String email) {
        final String sql = "SELECT COUNT(*) FROM app_user WHERE username = ? OR email = ?;";
        int count = jdbcTemplate.queryForObject(sql, Integer.class, username, email);
        return count == 0;
    }

    @Override
    public AppUser findUser(String input) {
        final String sql = "SELECT * FROM app_user WHERE username = ? OR email = ?;";

        AppUser user = jdbcTemplate.query(sql, new AppUserMapper(), input, input).stream()
                .findFirst()
                .orElse(null);

        if (user != null) {
            user.setAuthorityNames(getAuthorities(user.getId()));
        }

        return user;
    }

    @Override
    @Transactional
    public AppUser add(AppUser user) {
        final String sql = "INSERT INTO app_user (membership_id, email, username, password_hash, first_name, " +
                "last_name, phone, address, city, state, zip_code) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, new String[]{ "id" });
            ps.setInt(1, user.getMembershipId());
            ps.setString(2, user.getEmail());
            ps.setString(3, user.getUsername());
            ps.setString(4, user.getPassword());
            ps.setString(5, user.getFirstName());
            ps.setString(6, user.getLastName());
            ps.setString(7, user.getPhone());
            ps.setString(8, user.getAddress());
            ps.setString(9, user.getCity());
            ps.setString(10, user.getState());
            ps.setString(11, user.getZipCode());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        user.setId(keyHolder.getKey().intValue());
        return user;
    }

    @Override
    @Transactional
    public boolean update(AppUser user) {
        final String sql = "UPDATE app_user SET membership_id = ?, email = ?, username = ?, password_hash = ?, first_name = ?, " +
                "last_name = ?, phone = ?, address = ?, city =  ?, state = ?, zip_code = ? WHERE id = ?;";

        int rowsAffected = jdbcTemplate.update(sql,
                user.getMembershipId(), user.getEmail(), user.getUsername(),
                user.getPassword(), user.getFirstName(), user.getLastName(),
                user.getPhone(), user.getAddress(), user.getCity(),
                user.getState(), user.getZipCode(), user.getId());

        if (rowsAffected > 0) {
            setAuthorities(user);
            return true;
        }

        return false;
    }

    private void setAuthorities(AppUser user) {
        jdbcTemplate.update("DELETE FROM app_user_role WHERE app_user_id = ?;", user.getId());

        for (String authority : user.getAuthorityNames()) {

            String sql = "INSERT INTO app_user_role (app_user_id, app_role_id) "
                    + "VALUES (?, (SELECT id FROM app_role WHERE app_role_name = ?));";

            jdbcTemplate.update(sql, user.getId(), authority);
        }
    }

    private List<String> getAuthorities(int id) {
        final String sql = "SELECT r.app_role_name FROM app_user_role ar INNER JOIN app_role r ON "
                + "r.id = ar.app_role_id WHERE ar.app_user_id = ?;";

        return jdbcTemplate.query(sql,
                (rs, i) -> rs.getString("app_role_name"), id);
    }

}
