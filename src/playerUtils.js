export function updatePlayerPosition(direction, borders, spriteSize, backgroundElement, setBackgroundPosition, setPosition, isScreenMoving, objectCenterPositions) {
    //logic for updating player position
    setPosition((previousPosition) => {
        console.log(previousPosition)
        if (backgroundElement != null) {
          const computedStyle = window.getComputedStyle(
            backgroundElement.current
          );
  
          // Get the backgroundPosition property from the computed style
          const bgp = computedStyle.getPropertyValue("background-position");
          // calculate new background Position
          const [currentX, currentY] = bgp.split(" ");
          const currentXValue = parseInt(currentX, 10);
          const currentYValue = parseInt(currentY, 10);
  
          // if the window is bigger than the fixed gamescreen no scrolling is necesseary, otherwise only the amount of the difference
          const maxXScroll = 1792 - window.innerWidth;
          const maxYScroll = 1024 - window.innerHeight;
  
          // Subtract 10 from current background position
          // only chnage position under the condition that the Player is not at end of the background picture
          let newX;
          let newY;
          // left side
          if (!(currentXValue >= 0) && previousPosition.x <= 0 + spriteSize) {
            isScreenMoving.current = true;
            newX = currentXValue + 10;
            newY = currentYValue;
          } else if (
            !(currentXValue <= -maxXScroll) &&
            previousPosition.x >= window.innerWidth - 2 * spriteSize
          ) {
            // right side
            isScreenMoving.current = true;
            newX = currentXValue - 10;
            newY = currentYValue;
          } else if (
            !(currentYValue >= 0) &&
            previousPosition.y <= 0 + spriteSize
          ) {
            // top side
            isScreenMoving.current = true;
            newX = currentXValue;
            newY = currentYValue + 10;
          } else if (
            !(currentYValue <= -maxYScroll) &&
            previousPosition.y >= window.innerHeight - 2 * spriteSize
          ) {
            // bottom side
            isScreenMoving.current = true;
            newX = currentXValue;
            newY = currentYValue - 10;
          } else {
            isScreenMoving.current = false;
  
            newX = currentXValue;
            newY = currentYValue;
          }
          setBackgroundPosition(`${newX}px ${newY}px`);
        }

        let newPosition;
        // also check for collision of Player with objects
        for (const object of objectCenterPositions) {
            
            const distance = Math.sqrt(
                Math.pow(previousPosition.x - object.left, 2) +
                Math.pow(previousPosition.y - object.top, 2)
            );
            if(distance < object.radius) {
    
                const updatedDistance = Math.sqrt(
                    Math.pow(previousPosition.x + direction.current.x - object.left, 2) +
                    Math.pow(previousPosition.y + direction.current.y - object.top, 2)
                );    
                // Check if distance is less than or equal to the sum of radii
                if (updatedDistance < object.radius) {
                    console.log("exit")
                    // player chould not move into object
                    newPosition = {
                        x: previousPosition.x,
                        y: previousPosition.y,
                      };
                      return newPosition;
                }
            }
        }

        // player should not be able to walk past the map
        
        const bottomBorder = previousPosition.y >= borders.current.bottom;
        const upperBorder = previousPosition.y <= 0;
        const leftBorder = previousPosition.x <= 0;
        const rightBorder = previousPosition.x >= borders.current.right;
  
        if (!bottomBorder && !upperBorder && !leftBorder && !rightBorder) {
          newPosition = {
            x: previousPosition.x + direction.current.x,
            y: previousPosition.y + direction.current.y,
          };
        } else if (bottomBorder && leftBorder) {
          if (direction.current.x > 0) {
            newPosition = {
              x: previousPosition.x + direction.current.x,
              y: previousPosition.y,
            };
          } else if (direction.current.y < 0) {
            newPosition = {
              x: previousPosition.x,
              y: previousPosition.y + direction.current.y,
            };
          } else {
            newPosition = {
              x: previousPosition.x,
              y: previousPosition.y,
            };
          }
        } else if (bottomBorder && rightBorder) {
          if (direction.current.x < 0) {
            newPosition = {
              x: previousPosition.x + direction.current.x,
              y: previousPosition.y,
            };
          } else if (direction.current.y < 0) {
            newPosition = {
              x: previousPosition.x,
              y: previousPosition.y + direction.current.y,
            };
          } else {
            newPosition = {
              x: previousPosition.x,
              y: previousPosition.y,
            };
          }
        } else if (leftBorder && upperBorder) {
          if (direction.current.x > 0) {
            newPosition = {
              x: previousPosition.x + direction.current.x,
              y: previousPosition.y,
            };
          } else if (direction.current.y > 0) {
            newPosition = {
              x: previousPosition.x,
              y: previousPosition.y + direction.current.y,
            };
          } else {
            newPosition = {
              x: previousPosition.x,
              y: previousPosition.y,
            };
          }
        } else if (upperBorder && rightBorder) {
          if (direction.current.x < 0) {
            newPosition = {
              x: previousPosition.x + direction.current.x,
              y: previousPosition.y,
            };
          } else if (direction.current.y > 0) {
            newPosition = {
              x: previousPosition.x,
              y: previousPosition.y + direction.current.y,
            };
          } else {
            newPosition = {
              x: previousPosition.x,
              y: previousPosition.y,
            };
          }
        } else if (bottomBorder) {
          if (direction.current.y > 0) {
            newPosition = {
              x: previousPosition.x + direction.current.x,
              y: previousPosition.y,
            };
          } else if (direction.current.y <= 0) {
            newPosition = {
              x: previousPosition.x + direction.current.x,
              y: previousPosition.y + direction.current.y,
            };
          }
        } else if (upperBorder) {
          if (direction.current.y < 0) {
            newPosition = {
              x: previousPosition.x + direction.current.x,
              y: previousPosition.y,
            };
          } else if (direction.current.y >= 0) {
            newPosition = {
              x: previousPosition.x + direction.current.x,
              y: previousPosition.y + direction.current.y,
            };
          }
        } else if (leftBorder) {
          if (direction.current.x < 0) {
            newPosition = {
              x: previousPosition.x,
              y: previousPosition.y + direction.current.y,
            };
          } else if (direction.current.x >= 0) {
            newPosition = {
              x: previousPosition.x + direction.current.x,
              y: previousPosition.y + direction.current.y,
            };
          }
        } else if (rightBorder) {
          if (direction.current.x > 0) {
            newPosition = {
              x: previousPosition.x,
              y: previousPosition.y + direction.current.y,
            };
          } else if (direction.current.x <= 0) {
            newPosition = {
              x: previousPosition.x + direction.current.x,
              y: previousPosition.y + direction.current.y,
            };
          }
        }
  
        return newPosition;
      });
  }

  
  
  