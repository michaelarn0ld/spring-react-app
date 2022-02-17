package com.capstone.auth.security;

import com.capstone.auth.data.AppUserRepository;
import com.capstone.auth.models.AppUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class SecurityUserService implements UserDetailsService {

    @Autowired
    private AppUserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser user = repository.findUser(username);
        if (user == null || user.isDisabled()) {
            throw new UsernameNotFoundException(username);
        }
        return user;
    }
}
