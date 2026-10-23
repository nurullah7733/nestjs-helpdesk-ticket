import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Ticket } from './ticket.interface.js';
import { TicketsDto } from './dto/tickets.dto.js';
import { UpdateTicketsDto } from './dto/update-tickets-dto.js';

@Injectable()
export class TicketsService {
  private tickets: Ticket[] = [
    {
      id: 1,
      subject: 'Cant login to account',
      description:
        'The payment was successful and the order has been processed.',
      priority: 'high',
      status: 'open',
      createdAt: '2026-09-01T11:30:00.000Z',
    },
    {
      id: 2,
      subject: 'Payment failed',
      description: 'Card payment fails at the checkout step.',
      priority: 'medium',
      status: 'open',
      createdAt: '2026-09-02T11:30:00.000Z',
    },
    {
      id: 3,
      subject: 'Invoice download not working',
      description:
        'The invoice download button is not working on the order confirmation page.',
      priority: 'low',
      status: 'closed',
      createdAt: '2026-09-03T11:30:00.000Z',
    },
  ];
  private nextId = 4;

  getAllTickets(
    status?: Ticket['status'],
    priority?: Ticket['priority'],
  ): Ticket[] {
    let tickets = this.tickets;
    if (status) {
      tickets = tickets.filter((ticket) => ticket.status === status);
    }
    if (priority) {
      tickets = tickets.filter((ticket) => ticket.priority === priority);
    }
    return tickets;
  }

  getTicketById(id: number): Ticket | undefined {
    const ticket = this.tickets.find((ticket) => ticket.id === id);
    if (!ticket) {
      throw new NotFoundException(`Ticket with id ${id} not found`);
    }
    return ticket;
  }

  createTicket(ticketsDto: TicketsDto): Ticket {
    const newTicket: Ticket = {
      id: this.nextId++,
      subject: ticketsDto.subject,
      description: ticketsDto.description,
      priority: ticketsDto.priority,
      status: 'open',
      createdAt: new Date().toISOString(),
    };
    this.tickets.push(newTicket);
    return newTicket;
  }

  updateTicket(id: number, updateTicketsDto: UpdateTicketsDto) {
    const ticket = this.getTicketById(id);
    if (!ticket) {
      throw new NotFoundException(`Ticket with id ${id} not found`);
    }
    if (ticket.status === 'closed') {
      throw new BadRequestException(
        `Ticket with id ${id} is closed and cannot be updated`,
      );
    }
    if (updateTicketsDto.subject) {
      ticket.subject = updateTicketsDto.subject;
    }
    if (updateTicketsDto.description) {
      ticket.description = updateTicketsDto.description;
    }
    if (updateTicketsDto.priority) {
      ticket.priority = updateTicketsDto.priority;
    }
    return ticket;
  }

  updateTicketStatus(id: number) {
    let ticket = this.getTicketById(id);
    if (!ticket) {
      throw new NotFoundException(`Ticket with id ${id} not found`);
    }
    if (ticket.status === 'closed') {
      throw new BadRequestException(
        `Ticket with id ${id} status is already closed`,
      );
    }
    ticket.status = 'closed';
    return ticket;
  }
}
