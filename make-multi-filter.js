function MakeMultiFilter(originalArray) {
    // Initialize currentArray to be identical to originalArray
    let currentArray = [...originalArray];
  
    // The returned function arrayFilterer
    function arrayFilterer(filterCriteria, callback) {
      // If filterCriteria is not a function, return currentArray
      if (typeof filterCriteria !== 'function') {
        return currentArray;
      }
  
      // Filter currentArray based on the filterCriteria function
      currentArray = currentArray.filter(filterCriteria);
  
      // If callback is a function, call it with originalArray as 'this'
      if (typeof callback === 'function') {
        callback.call(originalArray, currentArray);
      }
  
      // Return the arrayFilterer function for chaining
      return arrayFilterer;
    }
  
    // Return the arrayFilterer function
    return arrayFilterer;
  }
  
  // Example usage:
  
  var arrayFilterer1 = MakeMultiFilter([1, 2, 3]);
  
  arrayFilterer1(function (elem) {
    return elem !== 2;
  }, function (currentArray) {
    console.log(this); // prints [1, 2, 3]
    console.log(currentArray); // prints [1, 3]
  });
  
  arrayFilterer1(function (elem) {
    return elem !== 3;
  });
  
  var currentArray = arrayFilterer1();
  console.log('currentArray', currentArray); // prints [1]
  
  function filterTwos(elem) {
    return elem !== 2;
  }
  
  function filterThrees(elem) {
    return elem !== 3;
  }
  
  var arrayFilterer2 = MakeMultiFilter([1, 2, 3]);
  var currentArray2 = arrayFilterer2(filterTwos)(filterThrees)();
  console.log('currentArray2', currentArray2); // prints [1]
  
  var arrayFilterer3 = MakeMultiFilter([1, 2, 3]);
  var arrayFilterer4 = MakeMultiFilter([4, 5, 6]);
  console.log(arrayFilterer3(filterTwos)()); // prints [1, 3]
  console.log(arrayFilterer4(filterThrees)()); // prints [4, 5, 6]
  