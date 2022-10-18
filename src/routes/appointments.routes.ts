import { Router } from "express";
import { parseISO } from "date-fns";
import AppointmentsRepository from "../repositories/AppointmentRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

const appointmentsRepository = new AppointmentsRepository();

const appointmentsRouter = Router();

appointmentsRouter.get('/', (request, response) =>
{
    const appointments = appointmentsRepository.Find();

    return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;
    const createAppointmentService = new CreateAppointmentService(appointmentsRepository);
    
    const parsedDate = parseISO(date);

    try{
        var result = createAppointmentService.execute({ provider, date: parsedDate });
        return response.json(result);
    }catch(ex){
        return response.status(200).json({ error: ex.message });
    };

});

export default appointmentsRouter;