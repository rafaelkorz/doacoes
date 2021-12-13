import React , {useState,useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
// import { getAllCars } from '../redux/actions/carsActions'
import DonationRegister from './../components/DonationRegister';
import { Col, Row , Divider , DatePicker, Checkbox, PageHeader} from 'antd'
import {Link} from 'react-router-dom'
import Spinner from '../components/Spinner';
import moment from 'moment'
const { RangePicker } = DatePicker
function Home() {
    // const {cars} = useSelector(state=>state.carsReducer)
    // const {loading} = useSelector(state=>state.alertsReducer)
    // const [totalCars , setTotalcars] = useState([])
    // const dispatch = useDispatch()
    

    // useEffect(() => {
    //     dispatch(getAllCars())
    // }, [])

    // useEffect(() => {

    //     setTotalcars(cars)
        
    // }, [cars])


    function setFilter(values){

        // var selectedFrom = moment(values[0] , 'MMM DD yyyy HH:mm')
        // var selectedTo = moment(values[1] , 'MMM DD yyyy HH:mm')

        // var temp=[]

        // for(var car of cars){

        //       if(car.bookedTimeSlots.length == 0){
        //           temp.push(car)
        //       }
        //       else{

        //            for(var booking of car.bookedTimeSlots) {

        //                if(selectedFrom.isBetween(booking.from , booking.to) ||
        //                selectedTo.isBetween(booking.from , booking.to) || 
        //                moment(booking.from).isBetween(selectedFrom , selectedTo) ||
        //                moment(booking.to).isBetween(selectedFrom , selectedTo)
        //                )
        //                {

        //                }
        //                else{
        //                    temp.push(car)
        //                }

        //            }

        //       }

        // }


        // setTotalcars(temp)
    }

    return (
        <DonationRegister />
    )
}

export default Home
