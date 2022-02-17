package com.capstone.auth.models;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.validation.constraints.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
public class AppUser implements UserDetails {

    @PositiveOrZero
    private int id;

    @Min(1)
    private int membershipId;

    @NotBlank
    @Email
    private String email;

    @NotNull
    @Pattern(regexp = "^[a-z0-9_-]{4,32}$")
    private String username;

    @NotNull
    // Password is 8 char and needs all the following: uppercase, lowercase, number, special character.
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,32}$")
    private String password;

    @NotNull
    @Size(min = 2, max = 64)
    private String firstName;

    @NotNull
    @Size(min = 2, max = 64)
    private String lastName;

    @NotNull
    // Phone: (888) 888-8888 || 888-888-8888 || 1112223333
    @Pattern(regexp = "^((\\(\\d{3}\\))|\\d{3})[- .]?\\d{3}[- .]?\\d{4}$")
    private String phone;

    @NotNull
    @Size(max = 128)
    private String address;

    @NotNull
    @Size(max = 128)
    private String city;

    @NotNull
    @Size(min = 2, max = 2)
    private String state;

    @NotNull
    @Size(min = 5, max = 5)
    private String zipCode;

    private boolean disabled;

    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    private List<String> authorities = new ArrayList<>();

    public List<String> getAuthorityNames() {
        return new ArrayList<>(authorities);
    }

    public void setAuthorityNames(List<String> authorities) {
        this.authorities = authorities;
    }

    public boolean hasAuthority(String authority) {
        return authorities.stream()
                .anyMatch(a -> a.equals(authority));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities.stream()
                .map(SimpleGrantedAuthority::new)
                .toList();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return !disabled;
    }

}
