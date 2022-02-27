package com.capstone.facility.models;

import lombok.Data;

import java.time.LocalTime;

@Data
public class Facility {
    private int id;
    private String name;
    private LocalTime open;
    private LocalTime close;
}
