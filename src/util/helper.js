let printDate = function() {
    let currentDate = new Date()
    console.log(currentDate)
}

let printMonth = function() {
    let currentDate = new Date()
    console.log( currentDate.getMonth()+1)
}

let getBatchInfo = function() {
    console.log('Radon, W2D4, the topic for today is Nodejs module system assignment discussion')
}

module.exports.printDate = printDate
module.exports.printMonth = printMonth
module.exports.getBatchInfo = getBatchInfo