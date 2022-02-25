package com.capstone.facility.models;

import java.time.LocalDateTime;

public class Reservation {
    int id;
    int appUserId;
    int facilityId;
    int reservableId;
    LocalDateTime start;
    LocalDateTime end;
}
