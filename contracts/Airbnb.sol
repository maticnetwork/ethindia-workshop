pragma solidity ^0.5.7;

contract Airbnb {

  struct Space {
    string name;
    string description;
    bool isActive;
    uint256 price;
    bool[] calendar;
  }

  uint256 spaceCount;
  mapping(uint256 => Space) spaces;

  function rentOutSpace(string memory name, string memory description, uint256 price) public {
    Space memory space = Space(name, description, true, price * (10 ** 18), new bool[](365));
    spaces[spaceCount] = space;
    spaceCount++;
  }

  function rentSpace(uint256 spaceId, uint256 checkInDate, uint256 checkoutDate) public payable {
    Space storage space = spaces[spaceId];
    require(
      space.isActive == true,
      "Space with this ID does not exist"
    );

    bool isAvailable = true;
    for(uint256 i = checkInDate; i < checkoutDate; i++) {
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
  }

  function rateSpace() public {

  }
}
