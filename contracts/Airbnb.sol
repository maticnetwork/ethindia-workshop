pragma solidity ^0.5.7;

contract Airbnb {

  struct Space {
    string name;
    string description;
    bool isActive;
    uint256 price;
    bool[] calendar;
  }

  uint256 spaceId;
  mapping(uint256 => Space) public spaces;

  struct Booking {
    uint256 spaceId;
    uint256 checkInDate;
    uint256 checkoutDate;
    address user;
  }

  uint256 bookingId;
  mapping(uint256 => Booking) public bookings;

  event NewSpace (
    uint256 indexed spaceId
  );

  event NewBooking (
    uint256 indexed spaceId,
    uint256 indexed bookingId
  );

  /**
   * @dev Put up an Airbnb space up for renting out
   * @param name Name of the space
   * @param description Short description of your property
   * @param price Price per day in ether
   */
  function rentOutSpace(string memory name, string memory description, uint256 price) public {
    Space memory space = Space(name, description, true, price * (10 ** 18), new bool[](365));
    spaces[spaceId] = space;
    emit NewSpace(spaceId++);
  }

  /**
   * @dev Make an Airbnb booking
   * @param _spaceId id of the space to rent out
   * @param checkInDate Check-in date
   * @param checkoutDate Check-out date
   */
  function rentSpace(uint256 _spaceId, uint256 checkInDate, uint256 checkoutDate) public payable {
    Space storage space = spaces[_spaceId];
    require(
      space.isActive == true,
      "Space with this ID is not active"
    );

    bool isAvailable = true;
    for (uint256 i = checkInDate; i < checkoutDate; i++) {
      isAvailable = isAvailable || space.calendar[i];
    }
    require(
      isAvailable == true,
      "Space is not available for the selected dates"
    );

    require(
      msg.value == space.price * (checkoutDate - checkInDate),
      "Sent insufficient funds"
    );

    // conditions satisfied
    _createBooking(_spaceId, checkInDate, checkoutDate);
  }

  function _createBooking(uint256 _spaceId, uint256 checkInDate, uint256 checkoutDate) internal {
    bookings[bookingId] = Booking(_spaceId, checkInDate, checkoutDate, msg.sender);
    Space storage space = spaces[_spaceId];
    for (uint256 i = checkInDate; i < checkoutDate; i++) {
      space.calendar[i] = false; // mark booked during the booking period
    }
    emit NewBooking(_spaceId, bookingId++);
  }

  // function rateSpace() public {}
}
