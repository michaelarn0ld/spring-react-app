package com.capstone.auth.data;

import com.capstone.auth.models.AppUser;

public interface AppUserRepository {

    AppUser findUser(String input);

    AppUser add(AppUser appUser);

    boolean update(AppUser appUser);

}
