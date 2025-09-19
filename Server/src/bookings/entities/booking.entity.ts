
import { Entity, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { Payment } from '../../payments/entities/payment.entity';
import { User } from '../../users/entities/user.entity';

@Entity('bookings')
export class Booking {
  @ManyToOne(() => Vehicle, vehicle => vehicle.bookings)
  vehicle: Vehicle;



  @ManyToOne(() => User, user => user.bookings)
  user: User;
  @OneToOne(() => Payment, payment => payment.booking)
  @JoinColumn()
  payment: Payment;
}