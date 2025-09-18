import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { VehicleCategory } from '../../categories/entities/vehicle-category.entity';
import { Location } from '../../locations/entities/location.entity';
import { Booking } from '../../bookings/entities/booking.entity';       
@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  make: string;

  @Column()
  model: string;

  @ManyToOne(() => VehicleCategory, category => category.vehicles)
  category: VehicleCategory;

  @ManyToOne(() => Location, location => location.vehicles)
  location: Location;

  @OneToMany(() => Booking, booking => booking.vehicle)
  bookings: Booking[];

  @Column()
  rentalRate: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
