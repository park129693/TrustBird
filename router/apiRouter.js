var User = require('../models/User')
var Contract = require('../models/Contract')
var MaintenanceFee = require('../models/MaintenanceFee')
var Trust = require('../models/Trust')
var router = require('express').Router()

router.route('/')
    .get((req, res, next) => {
        res.send("Success")
    })

router.route('/api/contract')
    .get((req, res, next) => {
        res.sendStatus(200)
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
    .get((req, res, next) => {

    })

// 관리비내역리스트 빈라우터
router.route('/api/maintenancefeelist')
    .get((req, res, next) => {

    })

// 서비스 소개 빈라우터
router.route('/api/serviceintro') 
    .get((req, res, next) => {

    })

router.route('/api/signup')
    .post((req, res, next)=>{
        const userdata = req.body

        const user = new User(userdata)

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
router.route('/api/signmodified')
    .get((req, res, next)=>{

 
    })

// 계약신탁출력
router.route('/api/trust')
    .get((req, res, next)=>{

 
    })

// 계약신탁요청
router.route('/api/trustsub')
    .get((req, res, next)=>{

    })

// 계약신탁방법, 빈라우터
router.route('/api/trustsub')
    .get((req, res, next)=>{

    })

module.exports = router;