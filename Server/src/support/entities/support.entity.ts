export class Support {}
@Entity('support_tickets')
export class SupportTicket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.supportTickets)
  user: User;

  @Column()
  subject: string;

  @Column()
  message: string;

  @Column({ default: 'open' })
  status: 'open' | 'pending' | 'closed';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
