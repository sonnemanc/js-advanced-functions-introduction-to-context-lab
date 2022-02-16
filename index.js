//  First Attempt
//function createEmployeeRecord(a) {
//    this.firstName = a[0];
//    this.familyName = b[1];
//    this.title = c[2];
//    this.payPerHour = d[3];
//}

let createEmployeeRecord = function(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

//  First Attempt
//let createEmployeeRecords = function(arrs) {
//    return createEmployeeRecord(arrs[0])
//    return createEmployeeRecord(arrs[1])
//}

//  Use map method to iterate through each array and call previous function to make records.
let createEmployeeRecords = function(arrs) {
    return arrs.map(function(arr){
        return createEmployeeRecord(arr)
    })
}


let createTimeInEvent = function(obj, dateStamp) {
    let [date, hour] = dateStamp.split(' ')      // sets both variable names and assigns them to the items recieved by calling 'split'
    obj.timeInEvents.push({      // push the elements into the previously defined array
        type: "TimeIn", 
        hour: parseInt(hour, 10),
        date
    })
    return obj
}

let createTimeOutEvent = function(obj, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    obj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return obj
}

let hoursWorkedOnDate = function(obj, soughtDate) {
  let timeIn = obj.timeInEvents.find(function(a) {
      return a.date === soughtDate
  })
  let timeOut = obj.timeOutEvents.find(function(b) {
      return b.date === soughtDate
  })
  return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = function(obj, soughtDate) {
  return hoursWorkedOnDate(obj, soughtDate) * obj.payPerHour
}

let allWagesFor = function(obj) {
  let eligibleDates = obj.timeInEvents.map(function(a) {
      return a.date
  })
  let payable = eligibleDates.reduce(function(memo, d) {
      return memo + wagesEarnedOnDate(obj, d)
  }, 0)
  return payable
}

let calculatePayroll = function(arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.reduce(function(memo, record) {
        return memo + allWagesFor(record)
    }, 0)
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  let employee = srcArray.find(function(a) {
      return a.firstName === firstName
  })
  return employee
}

