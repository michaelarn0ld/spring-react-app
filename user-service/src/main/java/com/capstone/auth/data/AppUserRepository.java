package com.capstone.auth.data;

import com.capstone.auth.models.AppUser;

import java.util.List;

public interface AppUserRepository {

    List<AppUser> findAll();

    boolean noDuplicateUsers(String username, String email);

    AppUser findUser(String input);

    AppUser add(AppUser user);

    boolean update(AppUser user);

}
