package com.capstone.auth.data;

import com.capstone.auth.models.AppUser;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class AppUserJdbcTemplateRepositoryTest {

    @Autowired
    AppUserRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindByUsername() {
        AppUser user = repository.findUser("michaelarn0ld");
        assertEquals("michaelarn0ld", user.getUsername());
        assertEquals("me@michaelarnold.io", user.getEmail());
    }

    @Test
    void shouldFindByEmail() {
        AppUser user = repository.findUser("me@michaelarnold.io");
        assertEquals("michaelarn0ld", user.getUsername());
        assertEquals("me@michaelarnold.io", user.getEmail());
    }

    @Test
    void shouldNotFindBadUsername() {
        AppUser user = repository.findUser("notmichaelarn0ld");
        assertNull(user);
    }

    @Test
    void shouldNotFindBadEmail() {
        AppUser user = repository.findUser("notme@michaelarnold.io");
        assertNull(user);
    }

}