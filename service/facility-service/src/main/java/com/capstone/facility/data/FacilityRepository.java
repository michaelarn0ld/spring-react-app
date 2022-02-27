package com.capstone.facility.data;

import com.capstone.facility.models.Facility;

public interface FacilityRepository {

    Facility findById(int id);

}
