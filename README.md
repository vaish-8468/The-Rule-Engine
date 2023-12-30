# The Rule Engine

### Introduction
Generally, customers have a fleet of delivery vehicles. They have had problems where drivers drive rashly or use their phones while driving, leading to accidents. A speed violation in a residential area is more serious than a speed violation on a highway. It’s dangerous to drive over 60kmph in a residential area, but not so much on a highway. There exist models nowadays that detects this behavior. These models are deployed in an IoT device on the vehicle. The IoT device is connected to the internet and can make API calls to a cloud server. 

The customers are interested in knowing if the driver is not driving safely. However, they don’t want to get alerted every time this happens- they are only interested in *repeated* speed violations.
Therefore, this is a RestAPI aka **The Rule Engine** that aggregates and transforms **driving events** into **alerts** that will be shown to the customer.

Every minute, these model emits a **driving event** with the following fields:

 - `timestamp` of type ISO date time 

 - `is_driving_safe` of type boolean. 

 - `vehicle_id` a unique ID associated with a vehicle

 - `location_type` one of the following values: `highway`, `residential`, `commercial`, `city_center`. 
  
For example:
```
{
  "timestamp": "2023-05-24T05:55:00+00:00",
  "is_driving_safe": true,
  "vehicle_id": 1234...,
  "location_type": "highway"
}

```

### Features

A. This RestAPI acts as a gateway between the driving event and the alert event. IoT device makes API calls to end driving events.

B. Implemented real-time updates to display alerts as they occur.

C. Alerts are generated when: 
   1. There are at least **X** events in the past **5 minutes** where `is_driving_safe` is `false`.
      1. The value X depends on the location_type:
          1. `highway`- 4
          2. `city_center`- 3
          3. `commercial`- 2
          4. `residential`- 1
   2. We haven’t already generated an alert in the past 5 minutes.
   
   These alerts are automatically stored in the database along with the count of the number of speed violations.
   
D. The alerts are available through a GET endpoint.

E. Scheduled API calls.

F. Filtering of events on the basis of vehicleIds and sorting in reverse chronological order.


### Future Scope
1. Dashboard Integration
2. Integration of a notification system to alert users when new critical alerts are generated. Notifications could be via email, SMS, or in-app notifications.
3. Graphical representation of violationCounts at locations for the respective vehicleId.

### Usage






Output: 
```
Alert! The driver of vehicle ID 635975xszxd is overspeeding. {
  timestamp: '2023-12-30T20:25:00.345Z',
  vehicleId: '635975xszxd',
  location_type: 'commercial',
  violationCount: 2
}
Alert! The driver of vehicle ID 635975xszxd is overspeeding. {
  timestamp: '2023-12-30T20:25:00.345Z',
  vehicleId: '635975xszxd',
  location_type: 'commercial',
  violationCount: 3
}
New alert created at 2023-12-30T20:25:00.345Z at the location commercial for the vehicle number 635975xszxd!
New alert created at 2023-12-30T20:25:00.345Z at the location commercial for the vehicle number 635975xszxd!
Repeatitive speed violations recognized for vehicle number 635975xszxd
Repeatitive speed violations recognized for vehicle number 635975xszxd
New alert created at undefined at the location commercial for the vehicle number 635975xszxd!
New alert created at undefined at the location commercial for the vehicle number 635975xszxd!
getLastAlert
Alert already generated...

```




![Alt text](<snips/Screenshot 2023-12-31 at 2.51.31 AM.png>)


![Alt text](<snips/Screenshot 2023-12-31 at 2.43.03 AM.png>)


