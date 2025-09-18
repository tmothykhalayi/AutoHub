export class Payment {}
@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.payments)
  user: User;

  @OneToOne(() => Booking, booking => booking.payment)
  booking: Booking;

  @Column()
  amount: number;

  @Column()
  status: 'pending' | 'completed' | 'failed';

  @Column()
  paymentIntentId: string; // Stripe Payment Intent ID

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
