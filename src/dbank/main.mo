import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank {
  stable var currentValue : Float = 100;
  stable var startTime = Time.now();

  public func topUp(amount : Float) {
    currentValue += amount;

    Debug.print(debug_show (currentValue));
  };

  public func withdraw(amount : Float) {
    let finalAmount : Float = currentValue -amount;
    if (finalAmount > 0) {
      currentValue -= amount;
    } else {
      return Debug.print("Amount insuficient!");
    };

    Debug.print(debug_show (currentValue));
  };

  public query func getCurrentValue() : async Float {
    return currentValue;
  };

  public func compound() {
    let currentTime = Time.now();
    let timeElapsedInNanoSec = currentTime - startTime;
    let timeElapsed = timeElapsedInNanoSec / 1000000000;
    currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsed));
    startTime := currentTime;

  };

  // topUp();
};
