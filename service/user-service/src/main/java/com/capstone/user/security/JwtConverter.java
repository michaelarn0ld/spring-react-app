package com.capstone.user.security;

import com.capstone.user.models.AppUser;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtConverter {

    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final String ISSUER = "user-service";

    public String getTokenFromUser(AppUser user) {

        int EXPIRATION_MINUTES = 15;
        int EXPIRATION_MILLIS = EXPIRATION_MINUTES * 60 * 1000;
        return Jwts.builder()
                .setIssuer(ISSUER)
                .setSubject(user.getUsername())
                .claim("id", user.getId())
                .claim("authorities", String.join(",", user.getAuthorityNames()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MILLIS))
                .signWith(key)
                .compact();
    }

    public AppUser getUserFromToken(String token) {

        if (token == null) {
            return null;
        }

        try {
            Jws<Claims> jws = Jwts.parserBuilder()
                    .requireIssuer(ISSUER)
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);

            AppUser user = new AppUser();

            user.setUsername(jws.getBody().getSubject());
            user.setId(jws.getBody().get("id", Integer.class));

            String authStr = jws.getBody().get("authorities", String.class);
            List<String> authorities = Arrays.stream(authStr.split(","))
                    .filter(a -> a != null && a.trim().length() != 0)
                    .collect(Collectors.toList());
            user.setAuthorityNames(authorities);

            return user;

        } catch (JwtException e) {
            //noinspection ThrowablePrintedToSystemOut
            System.out.println(e);
        }

        return null;
    }
}