### Let's begin by writing our data structures
1. `struct Property` represents a property that you may want to rent out
```
struct Property {
  string name;
  string description;
  bool isActive; // is property active
  uint256 price; // per day price in wei (1 ether = 10^18 wei)
  address owner; // Owner of the property

  // Is the property booked on a particular day,
  // For the sake of simplicity, we assign 0 to Jan 1, 1 to Jan 2 and so on
  // so isBooked[31] will denote whether the property is booked for Feb 1
  bool[] isBooked;
}
```

2. `struct Booking` represents the details of a particular booking
```
struct Booking {
  uint256 propertyId;
  uint256 checkInDate;
  uint256 checkoutDate;
  address user;
}
```

### Functions
1. Put up your funky space on the market
```
function rentOutproperty(string memory name, string memory description, uint256 price) public {
  Property memory property = Property({
    name: name,
    description: description,
    isActive: true,
    price: price,
    owner: msg.sender,
    isBooked: new bool[](365)
  });

  // Persist `property` object to the "permanent" storage
  properties[propertyId] = property;

  // emit an event to notify the clients
  emit NewProperty(propertyId++);
}
```

2. Rent/Book a property for your vacation!
```
function rentProperty(uint256 _propertyId, uint256 checkInDate, uint256 checkoutDate) public payable {
  // Retrieve `property` object from the storage
  Property storage property = properties[_propertyId];

  // Assert that property is active
  require(
    property.isActive == true,
    "property with this ID is not active"
  );

  // Assert that property is available for the dates
  for (uint256 i = checkInDate; i < checkoutDate; i++) {
    if (property.isBooked[i] == true) {
      // if property is booked on a day, revert the transaction
      revert("property is not available for the selected dates");
    }
  }

  // Check the customer has sent an amount equal to (pricePerDay * numberOfDays)
  require(
    msg.value == property.price * (checkoutDate - checkInDate),
    "Sent insufficient funds"
  );
}
```

3. Helper function to create a booking
```
function _createBooking(uint256 _propertyId, uint256 checkInDate, uint256 checkoutDate) internal {
  // Create a new booking object
  Booking memory booking = Booking({
    propertyId: _propertyId,
    checkInDate: checkInDate,
    checkoutDate: checkoutDate,
    user: msg.sender
  });

  // persist to storage
  bookings[bookingId] = booking;

  // Retrieve `property` object from the storage
  Property storage property = properties[_propertyId];

  // Mark the property booked on the requested dates
  for (uint256 i = checkInDate; i < checkoutDate; i++) {
    property.isBooked[i] = true;
  }

  // Emit an event to notify clients
  emit NewBooking(_propertyId, bookingId++);
}
```

