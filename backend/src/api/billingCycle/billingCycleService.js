const BillingCycle = require('./billingCycle')
const errorHandler = require('../commom/errorHandler')

BillingCycle.methods(['get', 'post', 'put', 'delete'])
BillingCycle.updateOptions({new: true, runValidators: true})
BillingCycle.after('post', errorHandler).after('put', errorHandler)

BillingCycle.route('count', (req, res, next) => {
    BillingCycle.count((error, value) => {
        if(error){
            res.status(500).json({errors: [error]})
        }else{
            res.json({value})
        }
    })
})

BillingCycle.route('summary', (req, res, next) => {
        
    BillingCycle.aggregate(

        {$project: {credit: {$sum: "$credits.value"}, debt: {$sum: "$debts.value"}}},
        {$group: {_id: null, credits:{$sum: "$credit"}, debts: {$sum: "$debt"}}},
        {$project: {_id: false, credits: true, debts: true}},
  
        (error, result) => {
            if (error) {
                res.status(500).json({ errors: [error] })
            } else {
                res.json(result[0] || { credits: 0, debts: 0 })
            }
        }
    )

})

module.exports = BillingCycle

   