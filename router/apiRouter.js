var User = require('../models/User')
var Contract = require('../models/Contract')
var MaintenanceFee = require('../models/MaintenanceFee')
var Trust = require('../models/Trust')
const { json } = require('body-parser')
const { db } = require('../models/User')
const cookieParser = require('cookie-parser')
var router = require('express').Router()

router.route('/')
    .get((req, res, next) => {
        res.send("Success")
    })

// 계약서 출력
router.route('/api/contract')
    .post((req, res, next) => {

        const contractData = req.body

        Contract.findOne((contractData), (err, result)=>{
            if(err){
                console.log(err)
                res.status(500).send("Error sigup new user please try again")
            }else{
            console.log(result)
            res.sendStatus(200)
            }
        })
    })

// 계약서 등록
router.route('/api/contractenroll')
    .post((req, res, next) => {

        const contractData = req.body

        const contract = new Contract(contractData)

        contract.save((err)=>{
            if(err){
                console.log(err)
                res.status(500).send("Error sigup new user please try again")
            } else {
                res.status(200).send("Sign Up is Success")
            }
        })

    })

router.route('/api/contractlist')
    .get((req, res, next) => {
        res.sendStatus(200)
    })

// 관리비내역출력
router.route('/api/maintenancefee')
    .post((req, res, next) => {

        const mainFeeData = req.body

        MaintenanceFee.findOne((mainFeeData), (err, result)=>{
            if(err){
                console.log(err)
                res.status(500).send("Error sigup new user please try again")
            } else {
                res.sendStatus(200)
                console.log(result)
            }
        })

    })

// 관리비내역리스트 빈라우터 => 저장 테스트를 위해 제작
router.route('/api/maintenancefeelist')
    .post((req, res, next) => {

        const mainFeeData = req.body

        const mainFee = new MaintenanceFee(mainFeeData)
        
        mainFee.save((err)=>{
            if(err){
                console.log(err)
                res.status(500).send("Error sigup new user please try again")
            } else {
                res.status(200).send("Fail")
            }
        })
    })

// 서비스 소개 빈라우터
router.route('/api/serviceintro') 
    .get((req, res, next) => {

    })

router.route('/api/signup')
    .post((req, res, next)=>{

        const userData = req.body

        const user = new User(userData)

        user.save((err)=>{
            if(err){
                console.log(err)
                res.status(500).send("Error sigup new user please try again")
            } else {
                res.status(200).send("Sign Up is Success")
            }
        })
    })

router.route('/api/signin')
    .post((req, res, next)=>{

        const { username, password } = req.body

        User.findOne({username}, (err, result) =>{
            if(err) {
                console.log(err)
                res.status(500).json({error : 'Internal error please try again'})
            } else if(!result) {
                console.log(result)
                res.status(401).json({error : 'This user not exist. please using after sign up'})
            } else {
                result.isCorrectPassword(password, (err, same)=>{
                    if(err){
                        console.log(err)
                        res.status(500).json({error : 'Internal error please try again'})
                    } else if (!same) {
                        res.status(401).json({error : 'Incorrect passowrd'})
                    } else {
                        res.status(200).send("HI")
                        console.log(result)
                    }
                })
            }
        })
    })

router.route('/api/signout')
    .get((req, res, next)=>{
        req.logout()
        res.redirect("/")
    })

// 회원정보수정
router.route('/api/signmodified/:username')
    .put((req, res, next)=>{

        User.update({username:req.params.username}, {$set: req.body},(err, output)=>{
            if(err) res.status(500).json({error: 'database fail'})
            console.log(output)
            if(!output.n) return res.status(404).json({error: 'Not Founnd'})
            res.json({error: 'Database Update'})
        })

    })

// 계약신탁출력
router.route('/api/trust')
    .post((req, res, next)=>{

        const trustData = req.body

        Trust.findOne((trustData),(err, result)=>{
            if(err){
                console.log(err)
                res.status(500).send("Error sigup new user please try again")
            } else {
                res.sendStatus(200)
                console.log(result)
            }
        })
    })

// 계약신탁요청
router.route('/api/trustsub')
    .post((req, res, next)=>{
        const trustData = req.body

        const trust = new Trust(trustData)

        trust.save((err)=>{
            if(err){
                console.log(err)
                res.status(500).send("Error sigup new user please try again")
            } else {
                res.status(200).send("Sign Up is Success")
            }
        })

    })

// 계약신탁방법, 빈라우터
router.route('/api/trustsub')
    .get((req, res, next)=>{

    })

// 회원탈퇴, 빈라우터
router.route('/api/trustsub')
    .get((req, res, next)=>{

    })


module.exports = router;