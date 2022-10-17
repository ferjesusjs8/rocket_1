import { Router } from "express";
import { startOfHour, parseISO } from "date-fns";
import AppointmentsRepository from "../repositories/AppointmentRepository";

const appointmentsRepository = new AppointmentsRepository();

const appointmentsRouter = Router();

appointmentsRouter.get('/', (request, response) =>
{
    const appointments = appointmentsRepository.Find();

    return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;
    
    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate =
    appointmentsRepository.findByDate(
        {
            date: parsedDate
        });

    if(findAppointmentInSameDate){
        return response.status(400).json({ message: 'This appointment is already booked' });
    }
    
    const appointment = appointmentsRepository.create(
        {
            provider,
            date: parsedDate
        });

    return response.json(appointment);
});

export default appointmentsRouter;