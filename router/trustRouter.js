var Trust = require('../models/Trust')
var router = require('express').Router()
var grid =  require('gridfs-stream')
var fs = require('fs')

// 계약신탁출력
router.route('/trust')
    .post((req, res, next)=>{

        const trustData = req.body

        Trust.findOne((trustData),(err, result)=>{
            if(err){
                console.log(err)
                res.status(500).send("Not find trust")
            } else {
                res.sendStatus(200)
                console.log(result)
            }
            res.send('')
        })
    })

// 계약신탁요청
router.route('/trustsub')
    .post((req, res, next)=>{
        const trustData = req.body

        const trust = new Trust(trustData)

        trust.save((err)=>{
            if(err){
                console.log(err)
                res.status(500).send("Internal error please try again")
            } else {
                res.status(200).send("Send you Trust")
            }
        })

    })

// 계약신탁방법, 빈라우터
router.route('/trustsub')
    .post((req, res, next)=>{
        console.log('testststst')
    })

module.exports = router;