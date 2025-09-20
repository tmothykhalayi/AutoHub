
import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne, 
  OneToOne, 
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn 
} from 'typeorm';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { Payment } from '../../payments/entities/payment.entity';
import { User } from '../../users/entities/user.entity';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING
  })
  booking_status: BookingStatus;
  
  @Column({ type: 'timestamp' })
  booking_date: Date;
  
  @Column({ type: 'timestamp' })
  return_date: Date;
  
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_amount: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Vehicle, vehicle => vehicle.bookings)
  vehicle: Vehicle;

  @ManyToOne(() => User, user => user.bookings)
  user: User;
  
  @OneToOne(() => Payment, payment => payment.booking)
  @JoinColumn()
  payment: Payment;
}