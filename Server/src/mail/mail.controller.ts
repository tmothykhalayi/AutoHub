import { Controller, Post, Body, Get } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('test-welcome')
  async sendTestWelcomeEmail(@Body() body: { email: string; name: string }) {
    await this.mailService.sendWelcomeEmail(body.email, body.name);
    return { success: true, message: 'Welcome email sent successfully' };
  }

  @Post('test-booking')
  async sendTestBookingConfirmation(@Body() body: { 
    email: string;
    name: string;
    bookingId: string;
    vehicleName: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    pickupLocation: string;
  }) {
    await this.mailService.sendBookingConfirmation(body.email, {
      name: body.name,
      bookingId: body.bookingId,
      vehicleName: body.vehicleName,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
      totalPrice: body.totalPrice,
      pickupLocation: body.pickupLocation,
    });
    return { success: true, message: 'Booking confirmation email sent successfully' };
  }

  @Post('test-payment')
  async sendTestPaymentReceipt(@Body() body: {
    email: string;
    name: string;
    paymentId: string;
    bookingId: string;
    amount: number;
    paymentMethod: string;
    paymentDate: string;
  }) {
    await this.mailService.sendPaymentReceipt(body.email, {
      name: body.name,
      paymentId: body.paymentId,
      bookingId: body.bookingId,
      amount: body.amount,
      paymentMethod: body.paymentMethod,
      paymentDate: new Date(body.paymentDate),
    });
    return { success: true, message: 'Payment receipt email sent successfully' };
  }

  @Post('test-password-reset')
  async sendTestPasswordReset(@Body() body: {
    email: string;
    name: string;
    resetLink: string;
  }) {
    await this.mailService.sendPasswordReset(body.email, body.name, body.resetLink);
    return { success: true, message: 'Password reset email sent successfully' };
  }

  @Post('test-support-ticket')
  async sendTestSupportTicket(@Body() body: {
    email: string;
    name: string;
    ticketId: string;
    subject: string;
    message: string;
    priority: string;
  }) {
    await this.mailService.sendSupportTicketConfirmation(body.email, {
      name: body.name,
      ticketId: body.ticketId,
      subject: body.subject,
      message: body.message,
      priority: body.priority,
    });
    return { success: true, message: 'Support ticket confirmation email sent successfully' };
  }

  @Post('test-generic')
  async sendTestGenericEmail(@Body() body: {
    to: string;
    subject: string;
    template: string;
    context: any;
  }) {
    await this.mailService.sendEmail(body.to, body.subject, body.template, body.context);
    return { success: true, message: 'Generic email sent successfully' };
  }
}