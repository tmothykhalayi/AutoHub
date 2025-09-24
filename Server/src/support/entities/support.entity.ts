import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
// src/modules/support/entities/support-ticket.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { SupportTicketResponse } from './support-ticket-response.entity';

export enum TicketStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  ON_HOLD = 'on_hold',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
}

export enum TicketPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export enum TicketCategory {
  BOOKING = 'booking',
  PAYMENT = 'payment',
  VEHICLE = 'vehicle',
  ACCOUNT = 'account',
  TECHNICAL = 'technical',
  GENERAL = 'general',
  COMPLAINT = 'complaint',
  FEEDBACK = 'feedback',
}

@Entity('support_tickets')
export class SupportTicket {
  
  @PrimaryGeneratedColumn('uuid')
  ticket_id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'varchar', length: 255 })
  subject: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: TicketCategory,
    default: TicketCategory.GENERAL,
  })
  category: TicketCategory;

  @Column({
    type: 'enum',
    enum: TicketPriority,
    default: TicketPriority.MEDIUM,
  })
  priority: TicketPriority;

  @Column({
    type: 'enum',
    enum: TicketStatus,
    default: TicketStatus.OPEN,
  })
  status: TicketStatus;

  @Column({ type: 'uuid', nullable: true })
  assigned_to: string; // Admin user ID

  @Column({ type: 'varchar', length: 50, nullable: true })
  ticket_number: string; // Human-readable ticket number

  @Column({ type: 'text', nullable: true })
  admin_notes: string;

  @Column({ type: 'timestamp', nullable: true })
  resolved_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  due_date: Date;

  @Column({ type: 'uuid', nullable: true })
  related_booking_id: string;

  @Column({ type: 'uuid', nullable: true })
  related_vehicle_id: string;

  @Column({ type: 'uuid', nullable: true })
  related_payment_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relationships
  @ManyToOne(() => User, (user) => user.support_tickets)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => SupportTicketResponse, (response) => response.ticket)
  responses: SupportTicketResponse[];
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.support_tickets, { eager: true })
  user: User;



  @Column()
  message: string;

  @Column({ default: 'open' })
  status: 'open' | 'pending' | 'closed';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
