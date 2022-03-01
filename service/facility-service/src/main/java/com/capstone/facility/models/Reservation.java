package com.capstone.facility.models;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Reservation {
    private int id;
    private int appUserId;
    private int equipmentId;
    private Reservable reservable;
    private Facility facility;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}