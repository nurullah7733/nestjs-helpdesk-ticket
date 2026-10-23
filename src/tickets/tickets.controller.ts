import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TicketsService } from './tickets.service.js';
import type { Ticket } from './ticket.interface.js';
import { TicketsDto } from './dto/tickets.dto.js';
import { FilterTicketsQueryDto } from './dto/filter-tickets-query.dto.js';
import { UpdateTicketsDto } from './dto/update-tickets-dto.js';
import { StaffGuard } from './guard/staff.guard.js';

@Controller('tickets')
export class TicketsController {
  constructor(readonly ticketsService: TicketsService) {}
  @Get()
  getAllTickets(@Query() filterDto: FilterTicketsQueryDto): any[] {
    return this.ticketsService.getAllTickets(
      filterDto.status,
      filterDto.priority,
    );
  }

  @Get(':id')
  getTicketById(@Param('id', ParseIntPipe) id: number): Ticket | undefined {
    return this.ticketsService.getTicketById(id);
  }

  @Post()
  createTicket(@Body() ticketsDto: TicketsDto): Ticket {
    return this.ticketsService.createTicket(ticketsDto);
  }

  @Patch(':id')
  updateTicket(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTicketsDto: UpdateTicketsDto,
  ) {
    return this.ticketsService.updateTicket(id, updateTicketsDto);
  }

  @UseGuards(StaffGuard)
  @Patch(':id/close')
  updateTicketStatus(@Param('id', ParseIntPipe) id: number) {
    return this.ticketsService.updateTicketStatus(id);
  }
}
