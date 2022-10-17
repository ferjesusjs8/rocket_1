import Appointment from "../models/Appointment";
import { isEqual } from "date-fns";

interface CreateAppointmentDTO{
    provider: string;
    date: Date;
}

class AppointmentsRepository  {
    private appointments: Appointment[];

    constructor(){
        this.appointments = [];
    }

    public create({ provider, date }: CreateAppointmentDTO): Appointment {
        const appointment = new Appointment({ provider, date} );

        this.appointments.push(appointment);

        return appointment;
    }

    public findByDate({ date }: Omit<CreateAppointmentDTO, 'provider'>): Appointment | null {
        const findAppointment =
            this.appointments
                .find(appointment => isEqual(date, appointment.date));

        return findAppointment || null;
    }

    public Find() : Appointment[] {
        return this.appointments;
    }
}

export default AppointmentsRepository;