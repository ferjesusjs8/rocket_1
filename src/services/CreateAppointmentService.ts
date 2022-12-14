import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentRepository";
import { startOfHour } from "date-fns";

interface RequestDTO{
    provider: string;
    date: Date;
}

class CreateAppointmentService{
    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository){
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({ provider, date }:RequestDTO): Appointment{
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
        {
            date: appointmentDate
        });

        if(findAppointmentInSameDate){
            throw Error('This appointment is already booked.');
        }

        const appointment = this.appointmentsRepository.create(
        {
            provider,
            date: appointmentDate
        });

        return appointment
    };
}

export default CreateAppointmentService;